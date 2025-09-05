import { Signal } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { OperationResult } from '../../models/operation-result.model';

export abstract class AbstractUserService {
  abstract users: Signal<User[]>;
  abstract refresh(): void;
  abstract add(
    user: Omit<User, 'id' | 'isdonor'>
  ): Observable<OperationResult<User>>;
  abstract remove(id: number): Observable<OperationResult>;
  abstract update(user: User): Observable<OperationResult<User>>;
  abstract search_by_id(id: number): Observable<OperationResult<User>>;
  abstract login(credentials: {
    login: string;
    password: string;
  }): Observable<OperationResult<User>>;
  abstract getUserById(id: number): Signal<User | undefined>;
  abstract fetchUserById(id: number): Observable<User>;
}
