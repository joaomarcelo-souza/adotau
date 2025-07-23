import { Component, computed, inject, Signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AbstractUserService } from '../../users/service/abstract-user.service';
import { CommonModule } from '@angular/common';
import { AbstractAnimalService } from '../../animals/services/abstract-animal.service';
import { Animal } from '../../animals/models/animal.model';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    Navbar, 
    MatIconModule, 
    MatCardModule, 
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfile {
  private route = inject(ActivatedRoute);
  private userService = inject(AbstractUserService);
  private animalService = inject(AbstractAnimalService);

  userId = toSignal(this.route.params.pipe(
    map(params => parseInt(params['id']))
  ));

  user = computed(() => {
    const id = this.userId();
    if (!id) return undefined;
    return this.userService.getUserById(id)();
  });

  userAnimals: Signal<Animal[]> = computed(() => {
    const user = this.user();
    if (!user) return [];
    return this.animalService.animals().filter(animal => animal.donorId === user.id);
  });
}