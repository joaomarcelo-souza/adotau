import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AbstractAnimalService } from './abstract-animal.service';
import { Animal } from '../models/animal.model';
import { Observable, of, throwError } from 'rxjs';
import { OperationResult } from '../../models/operation-result.model';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class MockAnimalService extends AbstractAnimalService {
  private authService = inject(AuthService);

  private _animals = signal<Animal[]>([
    {
      id: 1,
      name: 'Luna',
      species: 'Cachorro',
      sex: 'Fêmea',
      age: 2,
      size: 'Médio',
      description: 'Dócil, brincalhona e adora crianças.',
      city: 'Manaus',
      neighborhood: 'Centro',
      photourl: 'assets/dog-1.jpg',
      state: 'AM',
      donor_id: 101,
    },
    {
      id: 2,
      name: 'Thor',
      species: 'Gato',
      sex: 'Macho',
      age: 3,
      size: 'Pequeno',
      description: 'Calmo, carinhoso e adaptado a apartamentos.',
      city: 'Manaus',
      neighborhood: 'Flores',
      photourl: 'assets/cat-1.jpg',
      state: 'AM',
      donor_id: 101,
    },
    {
      id: 3,
      name: 'Mel',
      species: 'Cachorro',
      sex: 'Fêmea',
      age: 1,
      size: 'Pequeno',
      description: 'Muito ativa e companheira.',
      city: 'Manaus',
      neighborhood: 'Aleixo',
      photourl: 'assets/dog-1.jpg',
      state: 'AM',
      donor_id: 101,
    },
    {
      id: 4,
      name: 'Simba',
      species: 'Gato',
      sex: 'Macho',
      age: 4,
      size: 'Médio',
      description: 'Independente e curioso.',
      city: 'Manaus',
      neighborhood: 'Adrianópolis',
      photourl: 'assets/cat-1.jpg',
      state: 'AM',
      donor_id: 101,
    },
    {
      id: 5,
      name: 'Bella',
      species: 'Cachorro',
      sex: 'Fêmea',
      age: 5,
      size: 'Grande',
      description: 'Muito calma, ótima para famílias.',
      city: 'Manaus',
      neighborhood: 'Cidade Nova',
      photourl: 'assets/dog-1.jpg',
      state: 'AM',
      donor_id: 101,
    },
    {
      id: 6,
      name: 'Nina',
      species: 'Gato',
      sex: 'Fêmea',
      age: 2,
      size: 'Pequeno',
      description: 'Brincalhona e dócil.',
      city: 'Manaus',
      neighborhood: 'São Jorge',
      photourl: 'assets/cat-1.jpg',
      state: 'AM',
      donor_id: 103,
    },
    {
      id: 7,
      name: 'Max',
      species: 'Cachorro',
      sex: 'Macho',
      age: 3,
      size: 'Médio',
      description: 'Muito sociável e adora passeios.',
      city: 'Manaus',
      neighborhood: 'Japiim',
      photourl: 'assets/dog-1.jpg',
      state: 'AM',
      donor_id: 103,
    },
    {
      id: 8,
      name: 'Mimi',
      species: 'Gato',
      sex: 'Fêmea',
      age: 1,
      size: 'Pequeno',
      description: 'Tímida no começo, mas muito carinhosa.',
      city: 'Manaus',
      neighborhood: 'Ponta Negra',
      photourl: 'assets/cat-1.jpg',
      state: 'AM',
      donor_id: 103,
    },
    {
      id: 9,
      name: 'Bob',
      species: 'Cachorro',
      sex: 'Macho',
      age: 6,
      size: 'Grande',
      description: 'Muito protetor, ideal para casas grandes.',
      city: 'Manaus',
      neighborhood: 'Coroado',
      photourl: 'assets/dog-1.jpg',
      state: 'AM',
      donor_id: 103,
    },
    {
      id: 10,
      name: 'Lili',
      species: 'Gato',
      sex: 'Fêmea',
      age: 2,
      size: 'Pequeno',
      description: 'Muito dócil e se dá bem com outros gatos.',
      city: 'Manaus',
      neighborhood: 'Compensa',
      photourl: 'assets/cat-1.jpg',
      state: 'AM',
      donor_id: 103,
    },
  ]);

  animals = computed(() => this._animals());

  fetchAll(): void {
    this._animals.set([...this._animals()]);
  }

  fetchById(id: number): Observable<Animal> {
    const animal = this._animals().find((a) => a.id === id);
    if (!animal) {
      return throwError(() => new Error(`Animal com ID ${id} não encontrado`));
    }
    return of(animal);
  }

  getAnimalById(id: number): Signal<Animal | undefined> {
    return computed(() => this._animals().find((a) => a.id === id));
  }

  search_by_id(id: number): Observable<OperationResult<Animal>> {
    const animal = this._animals().find((a) => a.id === id);

    if (!animal) {
      return of({
        success: false,
        status: 404,
        error: `Animal com ID ${id} não encontrado`,
      });
    }

    return of({
      success: true,
      status: 200,
      data: animal,
    });
  }

  add(animal: Omit<Animal, 'id'>): Observable<OperationResult<Animal>> {
    const user = this.authService.getCurrentUser();

    if (!user || !user.isdonor) {
      return of({
        success: false,
        status: 403,
        error: 'Apenas doadores podem cadastrar animais',
      });
    }

    const newAnimal: Animal = {
      ...animal,
      id: Math.max(0, ...this._animals().map((a) => a.id)) + 1,
      donor_id: user.id,
    };

    this._animals.update((animals) => [...animals, newAnimal]);

    return of({
      success: true,
      status: 200,
      data: newAnimal,
    });
  }

  update(animal: Animal): Observable<OperationResult> {
    const user = this.authService.getCurrentUser();

    if (!user || user.id !== animal.donor_id) {
      return of({
        success: false,
        status: 403,
        error: 'Apenas o doador pode atualizar este animal',
      });
    }

    this._animals.update((animals) =>
      animals.map((a) => (a.id === animal.id ? animal : a))
    );

    return of({ success: true, status: 200 });
  }

  remove(id: number): Observable<OperationResult> {
    const animal = this._animals().find((a) => a.id === id);

    if (!animal) {
      return of({
        success: false,
        status: 404,
        error: 'Animal não encontrado',
      });
    }

    const user = this.authService.getCurrentUser();

    if (!user || user.id !== animal.donor_id) {
      return of({
        success: false,
        status: 403,
        error: 'Apenas o doador pode remover este animal',
      });
    }

    this._animals.update((animals) => animals.filter((a) => a.id !== id));
    return of({ success: true, status: 200 });
  }

  override search(query: string): Observable<OperationResult> {
    try {
      const lowerQuery = query.trim().toLowerCase();

      const filtered = this._animals().filter((animal) =>
        animal.name.toLowerCase().includes(lowerQuery)
      );

      return of({ success: true, status: 200, data: filtered });
    } catch (error) {
      return of({ success: false, status: 400, data: error });
    }
  }
}
