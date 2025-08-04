import { Component, inject, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar.component';
import { AnimalList } from '../../animals/animal-lists/animal-list/animal-list.component';
import { CatList } from '../../animals/animal-lists/cat-list/cat-list.component';
import { DogList } from '../../animals/animal-lists/dog-list/dog-list.component';
import { Router } from '@angular/router';
import { Breadcrumb } from '../../components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [Navbar, AnimalList, CatList, DogList, Breadcrumb],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.scss',
})
export class Animals {
  private router = inject(Router);
  currentRoute = signal('');

  ngOnInit() {
    this.currentRoute.set(this.router.url);
    this.router.events.subscribe(() => {
      this.currentRoute.set(this.router.url);
    });
  }
}
