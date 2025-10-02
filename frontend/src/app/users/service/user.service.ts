import { Injectable, computed, Signal, signal, inject } from '@angular/core';
import { AbstractUserService } from './abstract-user.service';
import { User } from '../models/user.model';
import { OperationResult } from '../../models/operation-result.model';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environments';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class UserService extends AbstractUserService {
  private _users = signal<User[]>([]);
  users = this._users.asReadonly();

  private _currentUser = signal<User | null>(null);
  currentUser = this._currentUser.asReadonly();

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  constructor() {
    super();
    console.info('UserService ativo - conectado ao backend');
  }

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // --- LOGIN ---
  login(credentials: {
    login: string;
    password: string;
  }): Observable<OperationResult> {
    const body = new HttpParams()
      .set('username', credentials.login)
      .set('password', credentials.password);

    return this.http
      .post<any>(`${environment.apiUrl}/token`, body, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .pipe(
        map((response) => {
          console.log('login response:', response);
          const token = response.access_token || response.token;
          const user = response.user || { login: credentials.login };

          localStorage.setItem('token', token);

          this.authService.login(user);

          return { success: true, status: 200, data: user };
        }),
        catchError((error) =>
          of({
            success: false,
            status: error.status,
            error: error.error?.detail || 'Falha no login',
          })
        )
      );
  }

  // --- ADD USER ---
  add(user: Omit<User, 'id' | 'isdonor'>): Observable<OperationResult> {
    return this.http
      .post<User>(`${environment.apiUrl}/v1/user/`, user, {
        headers: this.authHeaders(),
      })
      .pipe(
        map((createdUser) => {
          this._users.update((u) => [...u, createdUser]);
          return { success: true, status: 201, data: createdUser };
        }),
        catchError((error) =>
          throwError(() => ({
            success: false,
            status: error.status,
            error: error.error?.detail || 'Erro ao criar usuário',
          }))
        )
      );
  }

  // --- REFRESH USERS LIST ---
  refresh(): void {
    this.http
      .get<User[]>(`${environment.apiUrl}/v1/user/list`, {
        headers: this.authHeaders(),
      })
      .subscribe((data) => this._users.set(data));
  }

  // --- GET BY ID ---
  fetchUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/v1/user/${id}`, {
      headers: this.authHeaders(),
    });
  }

  search_by_id(id: number): Observable<OperationResult> {
    return this.fetchUserById(id).pipe(
      map((user) => ({
        success: true,
        status: 200,
        data: user,
      })),
      catchError(() =>
        of({
          success: false,
          status: 404,
          error: `Usuário com ID ${id} não encontrado`,
        })
      )
    );
  }

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._users().find((u) => u.id === id));
  }

  // --- UPDATE ---
  update(user: User): Observable<OperationResult> {
    return this.http
      .put<User>(`${environment.apiUrl}/v1/user/${user.id}`, user, {
        headers: this.authHeaders(),
      })
      .pipe(
        map((updatedUser) => {
          this._users.update((users) =>
            users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          );
          return { success: true, status: 200, data: updatedUser };
        }),
        catchError((error) =>
          throwError(() => ({
            success: false,
            status: error.status,
            error: error.error?.detail || 'Erro ao atualizar usuário',
          }))
        )
      );
  }

  // --- DELETE ---
  remove(id: number): Observable<OperationResult> {
    return this.http
      .delete<any>(`${environment.apiUrl}/v1/user/${id}`, {
        headers: this.authHeaders(),
      })
      .pipe(
        map(() => {
          this._users.update((users) => users.filter((u) => u.id !== id));
          return { success: true, status: 200 };
        }),
        catchError((error) =>
          throwError(() => ({
            success: false,
            status: error.status,
            error: error.error?.detail || 'Erro ao remover usuário',
          }))
        )
      );
  }
}
