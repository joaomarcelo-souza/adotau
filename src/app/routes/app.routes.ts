import { Routes } from '@angular/router';
import { Animals } from '../pages/animals/animals.component';
import { Register } from '../pages/register/register.component';
import { Login } from '../pages/login/login.component';
import { AnimalProfile } from '../pages/animal-profile/animal-profile.component';
import { UserProfile } from '../pages/user-profile/user-profile.component';

export const routes: Routes = [
    { path: '', component: Animals },
    { path: 'cadastrar', component: Register },
    { path: 'login',component: Login },
    { path: 'animais/:id', component: AnimalProfile }, 
    { path: 'user-profile', component: UserProfile }
];
