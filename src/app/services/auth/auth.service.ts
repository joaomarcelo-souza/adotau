import { User } from '../../users/models/user.model';
import { Injectable, PLATFORM_ID, signal, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal(false);
  private readonly AUTH_KEY = 'auth_data';

  // Usando inject em vez de constructor
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem(this.AUTH_KEY);
      if (savedUser) {
        this.currentUser.set(JSON.parse(savedUser));
        this.isAuthenticated.set(true);
      }
    }
  }

  login(user: User) {
    this.currentUser.set(user);
    this.isAuthenticated.set(true);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
    }
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_KEY);
    }
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }
}