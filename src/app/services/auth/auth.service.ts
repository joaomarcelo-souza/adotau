import { User } from '../../users/models/user.model';
import { Injectable, PLATFORM_ID, signal, inject, computed, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private _isAuthenticated = signal(false);
  private readonly AUTH_KEY = 'auth_data';
  private platformId = inject(PLATFORM_ID);

  isDonor = computed(() => {
    const user = this.currentUser();
    return user ? user.isDonor : false;
  });

  isLoggedIn = computed(() => this._isAuthenticated());

  constructor() {
    effect(() => {
      this._isAuthenticated.set(!!this.currentUser());
    });

    this.autoLogin();
  }

  autoLogin() {
    if (!isPlatformBrowser(this.platformId)) {
      console.log('autoLogin skipped: not browser environment');
      return;
    }

    const savedUser = localStorage.getItem(this.AUTH_KEY);
    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        console.log('autoLogin: User loaded from localStorage', user);
        this.currentUser.set(user);
      } catch (error) {
        console.error('autoLogin error: Failed to parse user from localStorage', error);
        localStorage.removeItem(this.AUTH_KEY);
      }
    } else {
      console.log('autoLogin: No user found in localStorage');
    }
  }

  login(user: User, isAutoLogin = false) {
    this.currentUser.set(user);

    if (!isAutoLogin && isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
        console.log('login: User saved to localStorage', user);
      } catch (error) {
        console.error('login error: Failed to save user to localStorage', error);
      }
    }
  }

  logout() {
    this.currentUser.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.AUTH_KEY);
      console.log('logout: User removed from localStorage');
    }
  }

  getCurrentUser() {
    return this.currentUser();
  }
}
