import { Component, inject } from '@angular/core';
import { AbstractAnimalService } from '../services/abstract-animal.service';
import { AnimalCard } from "../animal-card/animal-card.component";

@Component({
  selector: 'app-animal-list',
  imports: [AnimalCard],
  templateUrl: './animal-list.component.html',
  styleUrl: './animal-list.component.scss'
})
export class AnimalList {
  private service = inject(AbstractAnimalService)

  animals = this.service.animals;

  trackById = (_:number, item:any) => item.id 
}
