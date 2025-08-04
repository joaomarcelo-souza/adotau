import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { LoginForm } from '../../users/login-form/login-form.component';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Navbar, LoginForm, Breadcrumb],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class Login {}
