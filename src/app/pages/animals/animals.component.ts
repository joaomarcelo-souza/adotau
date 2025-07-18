import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { AnimalList } from '../../animals/animal-list/animal-list.component';

@Component({
  selector: 'app-animals',
  imports: [Navbar, AnimalList],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.scss'
})
export class Animals {

}
