import { Component, computed, inject } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import{ MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { AbstractUserService } from '../../users/abstract-user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';



@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [Navbar, MatIconModule, MatCardModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfile {
  private route = inject(ActivatedRoute);
  private animalService = inject(AbstractUserService);

  animalId = toSignal(this.route.params.pipe(
    map(params => parseInt(params['id']))
  ));

  animal = computed(() => {
    const id = this.user();
    return id ? this.animalService.getUserById(id)() : undefined;
  });
user: any;

}
