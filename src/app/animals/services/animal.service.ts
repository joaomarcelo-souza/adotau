import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractAnimalService } from './abstract-animal.service';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends AbstractAnimalService {
  private _animals = signal<Animal[]>([]);
  animals = computed(() => this._animals());

  getAnimalById(id: number): Signal<Animal | undefined> {
    return computed(() => this._animals().find(a => a.id === id));
  }
}