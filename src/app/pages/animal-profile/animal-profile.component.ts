import { Component, computed, inject } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractAnimalService } from '../../animals/services/abstract-animal.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-animal-profile',
  imports: [Navbar],
  templateUrl: './animal-profile.component.html',
  styleUrl: './animal-profile.component.scss'
})
export class AnimalProfile {
  private route = inject(ActivatedRoute);
  private animalService = inject(AbstractAnimalService);

  animalId = toSignal(this.route.params.pipe(
    map(params => parseInt(params['id']))
  ));

  animal = computed(() => {
    const id = this.animalId();
    return id ? this.animalService.getAnimalById(id)() : undefined;
  });
}
