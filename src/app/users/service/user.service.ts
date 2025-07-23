import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractUserService } from './abstract-user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractUserService {
  private _user = signal<User[]>([]);
  user = computed(() => this._user());

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._user().find(a => a.id === id));
  }
}