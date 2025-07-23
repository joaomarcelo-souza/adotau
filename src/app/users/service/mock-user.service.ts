import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractUserService } from './abstract-user.service';
import { User } from '../models/user.model';
import { OperationResult } from '../../models/operation-result.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockUserService extends AbstractUserService {
  private _users = signal<User[]>([
    {
      id: 101,
      name: 'Robert',
      age: 26,
      sex: 'masculino',
      city: 'São Paulo',
      state: 'SP',
      neighborhood: 'Moema',
      type_user: 'Doador',
      photoUrl: 'avatar.avif',
      phone: 995313111,
      email: 'robert@gmail.com',
      password: '123456',
      isActive: true,
      createdDate: new Date()
    },
    {
      id: 102,
      name: 'Jose',
      age: 25,
      sex: 'masculino',
      city: 'Rio de Janeiro',
      state: 'RJ',
      neighborhood: 'Copacabana',
      type_user: 'Adotante',
      photoUrl: 'avatar.avif',
      phone: 895489623,
      email: 'jose@gmail.com',
      password: '123456',
      isActive: true,
      createdDate: new Date()
    },
    {
      id: 103,
      name: 'Renata',
      age: 22,
      sex: 'Feminino',
      city: 'Manaus',
      state: 'AM',
      neighborhood: 'Compensa',
      type_user: 'Doador',
      photoUrl: 'avatar.avif',
      phone:  991145654,
      email: 'renata@gmail.com',
      password: '123456',
      isActive: true,
      createdDate: new Date()
    }
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
      id: Math.max(0, ...this._users().map(u => u.id)) + 1,
      createdDate: new Date()
    };
    
    this._users.update(users => [...users, newUser]);
    
    return of({ 
      sucess: true, 
      status: 200 
    })
  }

  remove(id: number): Observable<OperationResult> {
    const userExists = this._users().some(u => u.id === id);
    
    if (!userExists) {
      return of({ 
        sucess: false, 
        status: 404,
        error: `Usuário com ID ${id} não encontrado`
      })
    }
    
    this._users.update(users => users.filter(u => u.id !== id));
    
    return of({ 
      sucess: true, 
      status: 200 
    });
  }

  update(user: User): Observable<OperationResult> {
    const existingUser = this._users().find(u => u.id === user.id);
    
    if (!existingUser) {
      return of({ 
        sucess: false, 
        status: 404,
        error: `Usuário com ID ${user.id} não encontrado`
      });
    }
    
    this._users.update(users => 
      users.map(u => u.id === user.id ? user : u)
    );
    
    return of({ 
      sucess: true, 
      status: 200 
    });
  }

  search_by_id(id: number): Observable<OperationResult> {
    const user = this._users().find(u => u.id === id);
    
    if (!user) {
      return of({ 
        sucess: false, 
        status: 404,
        error: `Usuário com ID ${id} não encontrado`
      });
    }
    
    return of({ 
      sucess: true, 
      status: 200 
    });
  }

  login(query: any): Observable<OperationResult> {
    const { email, password } = query;
    const user = this._users().find(u => 
      u.email === email && u.password === password
    );
    
    if (!user) {
      return of({ 
        sucess: false, 
        status: 401,
        error: 'Credenciais inválidas'
      });
    }
    
    return of({ 
      sucess: true, 
      status: 200 
    });
  }

  user = computed(() => this._users());

  getUserById(id: number): Signal<User | undefined> {
    return computed(() => this._users().find(u => u.id === id));
  }
}