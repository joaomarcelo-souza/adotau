import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { UserForm } from '../../users/user-form/user-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Navbar, UserForm],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class Login {

}
