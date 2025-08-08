import { Component, computed, inject } from '@angular/core';
import { AbstractAnimalService } from '../../services/abstract-animal.service';
import { Animal } from '../../models/animal.model';
import { AnimalCard } from '../../animal-cards/animal-card/animal-card.component';

@Component({
  selector: 'app-dog-list',
  imports: [AnimalCard],
  templateUrl: './dog-list.component.html',
  styleUrl: './dog-list.component.scss',
})
export class DogList {
  private animalService = inject(AbstractAnimalService);

  animals = computed(() =>
    this.animalService
      .animals()
      .filter((animal: Animal) => animal.species === 'Cachorro')
  );

  trackById = (index: number, animal: Animal) => animal.id;
}
