import { Component, computed, inject } from '@angular/core';
import { AbstractAnimalService } from '../../services/abstract-animal.service';
import { Animal } from '../../models/animal.model';
import { AnimalCard } from '../../animal-cards/animal-card/animal-card.component';

@Component({
  selector: 'app-cat-list',
  imports: [AnimalCard],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.scss',
})
export class CatList {
  private animalService = inject(AbstractAnimalService);

  animals = computed(() =>
    this.animalService
      .animals()
      .filter((animal: Animal) => animal.species === 'Gato')
  );

  trackById = (index: number, animal: Animal) => animal.id;
}
