import { Routes } from '@angular/router';
import { Animals } from '../pages/animals/animals.component';
import { Register } from '../pages/register/register.component';
import { AnimalProfile } from '../pages/animal-profile/animal-profile.component';
import { UserProfile } from '../pages/user-profile/user-profile.component';
import { Login } from '../pages/login/login.component';
import { authGuard } from '../services/auth/auth.guard';
import { donorGuard } from '../services/auth/donor.guard';
import { RegisterAnimals } from '../pages/register-animals/register-animals';
import { Home } from '../pages/home/home.component';

export const routes: Routes = [
  // Home
  {
    path: '',
    component: Home,
    data: { breadcrumb: 'Home' },
  },

  // Rotas de animais
  {
    path: 'animais',
    data: { breadcrumb: 'Animais' },
    children: [
      {
        path: '',
        component: Animals,
        data: { breadcrumb: null },
      },
      {
        path: 'cachorros',
        component: Animals,
        data: { breadcrumb: 'Cachorros' },
      },
      {
        path: 'gatos',
        component: Animals,
        data: { breadcrumb: 'Gatos' },
      },
      {
        path: ':id',
        component: AnimalProfile,
        data: { breadcrumb: 'Perfil de Animal' },
      },
    ],
  },

  // Rotas de autenticação
  {
    path: 'cadastrar',
    component: Register,
    data: { breadcrumb: 'Cadastrar' },
  },
  {
    path: 'login',
    component: Login,
    data: { breadcrumb: 'Login' },
  },

  // Rotas de usuário
  {
    path: 'profile',
    data: { breadcrumb: 'Usuário' },
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: UserProfile,
        data: { breadcrumb: 'Perfil de Usuário' },
      },
      {
        path: 'animais/:id',
        component: AnimalProfile,
        data: { breadcrumb: 'Perfil de Animal' },
      },
      {
        path: 'cadastrar-animal',
        component: RegisterAnimals,
        canActivate: [donorGuard],
        data: { breadcrumb: 'Novo Animal' },
      },
      {
        path: 'alterar/:id',
        component: RegisterAnimals,
        canActivate: [authGuard, donorGuard],
        data: { breadcrumb: 'Editar Animal' },
      },
      {
        path: 'alterar-user/:id',
        component: Register,
        canActivate: [authGuard, donorGuard],
        data: { breadcrumb: 'Editar Usuario' },
      },
    ],
  },
];
