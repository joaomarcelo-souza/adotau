import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { FeaturedAnimals } from '../../animals/animal-lists/featured-animals/featured-animals.component';

@Component({
  selector: 'app-home',
  imports: [Navbar, FeaturedAnimals],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home {}
