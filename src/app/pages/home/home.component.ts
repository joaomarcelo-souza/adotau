import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { FeaturedAnimals } from '../../animals/animal-lists/featured-animals/featured-animals.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [Navbar, FeaturedAnimals, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home {}
