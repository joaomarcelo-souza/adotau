import { Injectable, inject, computed, signal } from '@angular/core';
import { AbstractAnimalService } from './abstract-animal.service';
import { Animal } from '../models/animal.model';
import { OperationResult } from '../../models/operation-result.model';
import { AuthService } from '../../services/auth/auth.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class AnimalService extends AbstractAnimalService {
  private authService = inject(AuthService);
  private _animals = signal<Animal[]>([]);
  
  animals = computed(() => this._animals());

  getAnimalById(id: number) {
    return computed(() => this._animals().find(a => a.id === id));
  }

  add(animal: Omit<Animal, 'id'>): Observable<OperationResult<Animal>> {
    const user = this.authService.getCurrentUser();
    
    if (!user || !user.isDonor) {
      return of({ 
        success: false, 
        status: 403, 
        error: 'Apenas doadores podem cadastrar animais' 
      });
    }
    
    const newAnimal: Animal = {
      ...animal,
      id: Date.now(), // ID temporário
      donorId: user.id // ID do doador logado
    };
    
    this._animals.update(animals => [...animals, newAnimal]);
    
    return of({ 
      success: true, 
      status: 200,
      data: newAnimal
    });
  }

  update(animal: Animal): Observable<OperationResult> {
    this._animals.update(animals => 
      animals.map(a => a.id === animal.id ? animal : a)
    );
    return of({ success: true, status: 200 });
  }

  remove(id: number): Observable<OperationResult> {
    this._animals.update(animals => 
      animals.filter(a => a.id !== id)
    );
    return of({ success: true, status: 200 });
  }
}