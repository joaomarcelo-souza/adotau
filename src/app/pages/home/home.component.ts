import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { FeaturedAnimals } from '../../animals/animal-lists/featured-animals/featured-animals.component';
import { MatIconModule } from '@angular/material/icon';
import { ReviewList } from '../../reviews/review-list/review-list.component';
import { Footer } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    Navbar,
    FeaturedAnimals,
    MatIconModule,
    ReviewList,
    Footer,
    RouterModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class Home {}
