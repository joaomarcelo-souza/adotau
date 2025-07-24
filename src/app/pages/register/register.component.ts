import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { AnimalForm } from '../../animals/animal-form/animal-form.component';

@Component({
  selector: 'app-register',
  imports: [Navbar, AnimalForm],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class Register {

}
