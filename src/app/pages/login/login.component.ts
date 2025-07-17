import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { MatCard } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  imports: [Navbar, MatCard, MatInputModule,  MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class Login {
showPassword: any;
  

}
