import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { AnimalForm } from '../../animals/animal-form/animal-form.component';
import { UserForm } from '../../users/user-form/user-form.component';

@Component({
  selector: 'app-register',
  imports: [UserForm],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class Register {

}
