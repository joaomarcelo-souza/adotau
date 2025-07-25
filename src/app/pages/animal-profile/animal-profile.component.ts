import { Component, computed, inject, Signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AbstractAnimalService } from '../../animals/services/abstract-animal.service';
import { Location } from '@angular/common';
import { AbstractUserService } from '../../users/service/abstract-user.service';

@Component({
  selector: 'app-animal-profile',
  standalone: true,
  imports: [
    Navbar,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './animal-profile.component.html',
  styleUrl: './animal-profile.component.scss'
})

export class AnimalProfile {
  private route = inject(ActivatedRoute);
  private animalService = inject(AbstractAnimalService);
  private userService = inject(AbstractUserService);
  private location = inject(Location);

  

  animalId = toSignal(this.route.params.pipe(
    map(params => parseInt(params['id']))
  ));

  animal = computed(() => {
    const id = this.animalId();
    if (!id) return undefined;
    return this.animalService.getAnimalById(id)();
  });

  
  isLoading = computed(() => !this.animal());

  goBack() {
    this.location.back();
  }

  user = computed(() => {
    const donorId = this.animal()?.donorId;
    if (!donorId) return undefined;
    return this.userService.getUserById(donorId)();

  });

}
