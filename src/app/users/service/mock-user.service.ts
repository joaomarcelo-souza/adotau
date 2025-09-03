import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { AbstractUserService } from './abstract-user.service';
import { User } from '../models/user.model';
import { OperationResult } from '../../models/operation-result.model';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class MockUserService extends AbstractUserService {
  private authService = inject(AuthService);

  constructor() {
    super();
  }

  private _users = signal<User[]>([
    {
      id: 101,
      name: 'Robert',
      last_name: 'Navarro',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Moema',
      type_user: 'Doador',
      isdonor: true,
      photourl: 'avatar.avif',
      phone: 995313111,
      email: 'robert@gmail.com',
      login: 'robert21',
      password: '123456',
    },
    {
      id: 102,
      name: 'Jose',
      last_name: 'Carlos',
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: 'Copacabana',
      type_user: 'Adotante',
      isdonor: false,
      photourl: 'avatar.avif',
      phone: 895489623,
      email: 'jose@gmail.com',
      login: 'jose22',
      password: '123456',
    },
    {
      id: 103,
      name: 'Renata',
      last_name: 'Beltrão',
      city: 'Manaus',
      state: 'AM',
      neighborhood: 'Compensa',
      type_user: 'Doador',
      isdonor: true,
      photourl: 'avatar.avif',
      phone: 991145654,
      email: 'renata@gmail.com',
      login: 'renata123',
      password: '123456',
    },
  ]);

  users = computed(() => this._users());

  refresh(): void {
    setTimeout(() => {
      this._users.set([...this._users()]);
    }, 1000);
  }

  add(user: Omit<User, 'id' | 'createdDate'>): Observable<OperationResult> {
    const newUser: User = {
      ...user,
      id: Math.max(0, ...this._users().map((u) => u.id)) + 1,
      isdonor: user.type_user === 'Doador',
    };

    this._users.update((users) => [...users, newUser]);
    return of({ success: true, status: 200 });
  }

  remove(id: number): Observable<OperationResult> {
    const userExists = this._users().some((u) => u.id === id);

    if (!userExists) {
      return of({
        success: false,
        status: 404,
        error: `Usuário com ID ${id} não encontrado`,
      });
    }

    this._users.update((users) => users.filter((u) => u.id !== id));

    return of({
      success: true,
      status: 200,
    });
  }

  update(user: User): Observable<OperationResult> {
    const existingUser = this._users().find((u) => u.id === user.id);

    if (!existingUser) {
      return of({
        success: false,
        status: 404,
        error: `Usuário com ID ${user.id} não encontrado`,
      });
    }

    this._users.update((users) =>
      users.map((u) => (u.id === user.id ? user : u))
    );

    return of({
      success: true,
      status: 200,
    });
  }

  search_by_id(id: number): Observable<OperationResult> {
    const user = this._users().find((u) => u.id === id);

    if (!user) {
      return of({
        success: false,
        status: 404,
        error: `Usuário com ID ${id} não encontrado`,
      });
    }

    return of({
      success: true,
      status: 200,
    });
  }

  login(query: any): Observable<OperationResult> {
    const { login, password } = query;
    const user = this._users().find(
      (u) => u.login === login && u.password === password
    );

    if (!user) {
      return of({
        success: false,
        status: 401,
        error: 'Credenciais inválidas',
      });
    }

    this.authService.login(user);

    return of({
      success: true,
      status: 200,
      data: user,
    });
  }

  user = computed(() => this._users());

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._users().find((u) => u.id === id));
  }
}
