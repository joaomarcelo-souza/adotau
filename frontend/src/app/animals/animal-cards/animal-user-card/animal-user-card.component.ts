import { Component, Input } from '@angular/core';
import { Animal } from '../../models/animal.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-animal-user-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './animal-user-card.component.html',
  styleUrl: './animal-user-card.component.scss',
})
export class AnimalUserCard {
  @Input() animal!: Animal;
}
