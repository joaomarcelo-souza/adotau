import { Injectable, inject, computed, signal } from '@angular/core';
import { AbstractAnimalService } from './abstract-animal.service';
import { Animal } from '../models/animal.model';
import { OperationResult } from '../../models/operation-result.model';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AnimalService extends AbstractAnimalService {
  private authService = inject(AuthService);
  private http = inject(HttpClient);

  private _animals = signal<Animal[]>([]);
  animals = computed(() => this._animals());

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  fetchAll(): void {
    this.http
      .get<Animal[]>(`${environment.apiUrl}/v1/animal/list`)
      .subscribe((data) => this._animals.set(data));
  }

  fetchById(animalId: number): Observable<Animal> {
    return this.http.get<Animal>(
      `${environment.apiUrl}/v1/animal/${animalId}`,
      {
        headers: this.authHeaders(),
      },
    );
  }

  search_by_id(animalId: number): Observable<OperationResult<Animal>> {
    return this.fetchById(animalId).pipe(
      map((animal) => {
        // Atualiza o cache local
        this._animals.update((animals) => {
          const exists = animals.some((a) => a.id === animal.id);
          return exists
            ? animals.map((a) => (a.id === animal.id ? animal : a))
            : [...animals, animal];
        });

        return { success: true, status: 200, data: animal };
      }),
      catchError(() =>
        of({
          success: false,
          status: 404,
          error: `Animal com ID ${animalId} não encontrado`,
        }),
      ),
    );
  }

  getAnimalById(id: number) {
    return computed(() => this._animals().find((a) => a.id === id));
  }
  // --- CREATE ---
  add(animal: Omit<Animal, 'id'>): Observable<OperationResult<Animal>> {
    const user = this.authService.getCurrentUser();

    if (!user || !user.isdonor) {
      return throwError(() => ({
        success: false,
        status: 403,
        error: 'Apenas doadores podem cadastrar animais',
      }));
    }

    return this.http
      .post<Animal>(`${environment.apiUrl}/v1/animal/user/${user.id}`, animal, {
        headers: this.authHeaders(),
      })
      .pipe(
        map((createdAnimal) => {
          this._animals.update((animals) => [...animals, createdAnimal]);
          return { success: true, status: 200, data: createdAnimal };
        }),
        catchError((error) =>
          throwError(() => ({
            success: false,
            status: error.status,
            error: error.error?.detail || 'Erro ao criar animal',
          })),
        ),
      );
  }

  // --- UPDATE ---
  update(animal: Animal): Observable<OperationResult<Animal>> {
    return this.http
      .put<Animal>(`${environment.apiUrl}/v1/animal/${animal.id}`, animal, {
        headers: this.authHeaders(),
      })
      .pipe(
        map((updatedAnimal) => {
          this._animals.update((animals) =>
            animals.map((a) => (a.id === updatedAnimal.id ? updatedAnimal : a)),
          );
          return { success: true, status: 200, data: updatedAnimal };
        }),
        catchError((error) =>
          throwError(() => ({
            success: false,
            status: error.status,
            error: error.error?.detail || 'Erro ao atualizar animal',
          })),
        ),
      );
  }

  // --- DELETE ---
  remove(animalId: number): Observable<OperationResult> {
    return this.http
      .delete<void>(`${environment.apiUrl}/v1/animal/${animalId}`, {
        headers: this.authHeaders(),
      })
      .pipe(
        map(() => {
          this._animals.update((animals) =>
            animals.filter((a) => a.id !== animalId),
          );
          return { success: true, status: 200 };
        }),
        catchError((error) =>
          throwError(() => ({
            success: false,
            status: error.status,
            error: error.error?.detail || 'Erro ao remover animal',
          })),
        ),
      );
  }

  override search(): Observable<OperationResult> {
    return of();
  }
}
