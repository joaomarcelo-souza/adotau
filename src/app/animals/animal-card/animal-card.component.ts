import { Component, Input } from '@angular/core';
import { Animal } from '../models/animal.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatMenuModule, RouterModule, MatButtonModule],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.scss'
})
export class AnimalCard {
  @Input() animal!: Animal;
  
}