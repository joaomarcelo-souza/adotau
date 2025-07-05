import { Component, Input } from '@angular/core';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-animal-card',
  imports: [],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCard {
  @Input() animal!: {name: string, species: string, sex: string, age: number, size: string, description: string, city: string, neighborhood: string, photoUrl: string, donorId: number};

}
