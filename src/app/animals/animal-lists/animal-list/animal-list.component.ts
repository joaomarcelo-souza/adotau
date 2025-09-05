import { Component, inject, OnInit } from '@angular/core';
import { AbstractAnimalService } from '../../services/abstract-animal.service';
import { AnimalCard } from '../../animal-cards/animal-card/animal-card.component';
import { Animal } from '../../models/animal.model';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [AnimalCard],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss'],
})
export class AnimalList implements OnInit {
  private animalService = inject(AbstractAnimalService);

  // Signal do array de animais
  animals = this.animalService.animals;

  // TrackBy para otimizar renderização do *ngFor
  trackById = (index: number, animal: Animal) => animal.id;

  ngOnInit(): void {
    // Busca todos os animais do backend quando o componente inicia
    this.animalService.fetchAll();
  }
}
