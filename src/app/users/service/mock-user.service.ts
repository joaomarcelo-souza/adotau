import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractUserService } from './abstract-user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockUserService extends AbstractUserService {
  private _user = signal<User[]>([
    {
      id: 101,
      name: 'Robert',
      age: 26,
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Moema',
      type_user: 'Doador',
      photoUrl: 'avatar.avif',
      phone: 995313111,
      email: 'robert@gmail.com',
      sex: 'masculino'
    },
    {
      id: 102,
      name: 'Jose',
      age: 25,
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: 'Copacabana',
      type_user: 'Adotante',
      photoUrl: 'avatar.avif',
      phone: 895489623,
      email: 'jose@gmail.com',
      sex: 'masculino'
    },
    {
      id: 103,
      name: 'Renata',
      age: 22,
      city: 'Manaus',
      state: 'AM',
      neighborhood: 'Compensa',
      type_user: 'Doador',
      photoUrl: 'avatar.avif',
      phone:  991145654,
      email: 'renata@gmail.com',
      sex: 'Feminino'
    }
]);

  user = computed(() => this._user());

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._user().find(a => a.id === id));
  }

}