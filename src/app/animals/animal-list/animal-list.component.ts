import { Component, inject } from '@angular/core';
import { AbstractAnimalService } from '../services/abstract-animal.service';
import { AnimalCard } from "../animal-card/animal-card.component";
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [AnimalCard],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalList {
  private animalService = inject(AbstractAnimalService);
  
  animals = this.animalService.animals;

  // Corrigindo a tipagem do trackById
  trackById = (index: number, animal: Animal) => animal.id;
}