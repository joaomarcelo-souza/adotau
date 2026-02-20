import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { UserForm } from '../../users/user-form/user-form.component';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-register',
  imports: [UserForm, Navbar, Breadcrumb],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class Register {}
