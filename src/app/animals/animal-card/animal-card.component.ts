import { Component, Input } from '@angular/core';
import { Animal } from '../models/animal.model';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCard {
  @Input() animal!: Animal;
  
}