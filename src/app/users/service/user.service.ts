import { Injectable, computed, Signal, signal } from '@angular/core';
import { AbstractUserService } from './abstract-user.service';
import { User } from '../models/user.model';
import { OperationResult } from '../../models/operation-result.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class UserService extends AbstractUserService {
  private _users = signal<User[]>([]);
  users = this._users.asReadonly();

  constructor() {
    super();
    console.info('UserService mock ativo - dados em memória');
  }

  refresh(): void {
  
  }

  add(user: Omit<User, 'id' | 'createdDate'>): Observable<OperationResult> {
    const newUser: User = {
      ...user,
      id: this.generateId(),
      createdDate: new Date(),

    };
    this._users.update(users => [...users, newUser]);
    return of({ success: true, status: 201 });
  }

  update(user: User): Observable<OperationResult> {
    const index = this._users().findIndex(u => u.id === user.id);
    if (index !== -1) {
      const updatedUsers = [...this._users()];
      updatedUsers[index] = user;
      this._users.set(updatedUsers);
      return of({ success: true, status: 200 });
    }
    return of({ success: false, status: 404, error: 'Usuário não encontrado' });
  }

  remove(id: number): Observable<OperationResult> {
    const exists = this._users().some(u => u.id === id);
    if (exists) {
      this._users.update(users => users.filter(u => u.id !== id));
      return of({ success: true, status: 200 });
    }
    return of({ success: false, status: 404, error: 'Usuário não encontrado' });
  }

  search_by_id(id: number): Observable<OperationResult> {
    const user = this._users().find(u => u.id === id);
    if (user) {
      return of({ success: true, status: 200 });
    }
    return of({ success: false, status: 404, error: 'Usuário não encontrado' });
  }

  login(credentials: any): Observable<OperationResult> {
    
    const user = this._users().find(u => u.email === credentials.email);
    if (user && credentials.password === '12345678') {
      return of({ success: true, status: 200 });
    }
    return of({ success: false, status: 401, error: 'Credenciais inválidas' });
  }

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._users().find(u => u.id === id));
  }

  user = computed(() => this._users());

  private generateId(): number {
    const users = this._users();
    return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }
}
