import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { AnimalForm } from '../../animals/animal-form/animal-form.component';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-register-animals',
  imports: [Navbar, AnimalForm, Breadcrumb],
  templateUrl: './register-animals.html',
  styleUrl: './register-animals.scss',
})
export class RegisterAnimals {}
