import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractUserService } from './abstract-user.service';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockUserService extends AbstractUserService {
  private _user = signal<User[]>([
    {
      id: 42,
      name: 'Rex',
      sex: 'Macho',
      age: 3,
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Moema',
      photoUrl: 'assets/dog-profile.jpg',
      UserId: 4
    },
    {
      id: 43,
      name: 'Luna',
      sex: 'Fêmea',
      age: 2,
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: 'Copacabana',
      photoUrl: 'assets/cat-profile.jpg',
      UserId: 2
    }
]);

  user = computed(() => this._user());

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._user().find(a => a.id === id));
  }

}