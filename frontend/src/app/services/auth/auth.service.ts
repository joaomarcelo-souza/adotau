import {
  Injectable,
  PLATFORM_ID,
  inject,
  signal,
  computed,
  effect,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../users/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private platformId = inject(PLATFORM_ID);

  private _currentUser = signal<User | null>(null);
  private _isAuthenticated = signal(false);

  isLoggedIn = computed(() => this._isAuthenticated());
  isDonor = computed(() => !!this._currentUser()?.isdonor);

  constructor() {
    // Atualiza o estado de autenticação sempre que o usuário mudar
    effect(() => {
      this._isAuthenticated.set(!!this._currentUser());
    });

    // Auto login assim que o serviço é instanciado
    this.autoLogin();
  }

  private readonly AUTH_KEY = 'auth_data';

  async autoLogin(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedUser = localStorage.getItem(this.AUTH_KEY);
    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        this._currentUser.set(user);
      } catch {
        localStorage.removeItem(this.AUTH_KEY);
      }
    }
  }

  login(user: User, save = true) {
    this._currentUser.set(user);
    if (save && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('auth_data', JSON.stringify(user));
    }
  }

  logout() {
    this._currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_data');
    }
  }

  getCurrentUser(): User | null {
    return this._currentUser();
  }

  // Se precisar de um signal direto para usar no template
  currentUserSignal() {
    return this._currentUser;
  }
}
