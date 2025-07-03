import { Routes } from '@angular/router';
import { Animals } from '../pages/animals/animals.component';
import { Register } from '../pages/register/register.component';

export const routes: Routes = [
    { path: '', component: Animals },
    { path: 'cadastrar', component: Register },
];
