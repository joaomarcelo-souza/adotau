import { computed, Injectable, Signal, signal } from '@angular/core';
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
    console.warn('UserService está em modo esqueleto - Implemente os métodos reais');
  }

  refresh(): void {
  }

  add(user: Omit<User, 'id' | 'createdDate'>): Observable<OperationResult> {
    return of({ 
      success: false, 
      status: 501,
      error: 'Método não implementado' 
    });
  }

  remove(id: number): Observable<OperationResult> {
    return of({ 
      success: false, 
      status: 501,
      error: 'Método não implementado' 
    });
  }

  update(user: User): Observable<OperationResult> {
    return of({ 
      success: false, 
      status: 501,
      error: 'Método não implementado' 
    });
  }

  search_by_id(id: number): Observable<OperationResult> {
    return of({ 
      success: false, 
      status: 501,
      error: 'Método não implementado' 
    });
  }

  login(credentials: any): Observable<OperationResult> {
    return of({ 
      success: false, 
      status: 501,
      error: 'Método não implementado' 
    });
  }

  user = computed(() => this._users());

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._users().find(u => u.id === id));
  }
}