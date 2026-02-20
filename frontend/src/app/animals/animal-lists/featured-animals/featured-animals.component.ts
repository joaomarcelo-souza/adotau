import { Component, inject, OnInit } from '@angular/core';
import { AbstractAnimalService } from '../../services/abstract-animal.service';
import { Animal } from '../../models/animal.model';
import { AnimalCard } from '../../animal-cards/animal-card/animal-card.component';

@Component({
  selector: 'app-featured-animals',
  imports: [AnimalCard],
  templateUrl: './featured-animals.component.html',
  styleUrl: './featured-animals.component.scss',
})
export class FeaturedAnimals implements OnInit {
  private animalService = inject(AbstractAnimalService);

  animals = this.animalService.animals;

  trackById = (index: number, animal: Animal) => animal.id;

  get featuredAnimals() {
    return this.animals().slice(0, 4);
  }

  ngOnInit(): void {
    this.animalService.fetchAll();
  }
}
