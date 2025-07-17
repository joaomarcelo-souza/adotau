import { Component, Input } from '@angular/core';
import { Animal } from '../models/animal.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

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