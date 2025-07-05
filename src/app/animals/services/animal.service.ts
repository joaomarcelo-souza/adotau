import { computed, Injectable, signal } from '@angular/core';
import { AbstractAnimalService } from './abstract-animal.service';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends AbstractAnimalService {
  private _animals = signal<Animal[]>([]);
  animals = computed(() => this._animals());
}