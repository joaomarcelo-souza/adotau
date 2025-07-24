import { Routes } from '@angular/router';
import { Animals } from '../pages/animals/animals.component';
import { Register } from '../pages/register/register.component';
import { AnimalProfile } from '../pages/animal-profile/animal-profile.component';
import { UserProfile } from '../pages/user-profile/user-profile.component';
import { Login } from '../pages/login/login.component';
import { authGuard } from '../services/auth/auth.guard';

export const routes: Routes = [
    { path: '', component: Animals },
    { path: 'login', component: Login},
    { path: 'animais/:id', component: AnimalProfile }, 
    { path: 'profile', component: UserProfile, canActivate: [authGuard] },
    { path: 'register', component: Register}
];
