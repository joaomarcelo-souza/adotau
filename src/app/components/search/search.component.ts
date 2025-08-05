import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../animals/models/animal.model';
import { AbstractAnimalService } from '../../animals/services/abstract-animal.service';
import { firstValueFrom } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class Search {
  private service = inject(AbstractAnimalService);
  private router = inject(Router);

  filteredAnimals: Animal[] = [];
  searchQuery: string = '';
  showSuggestions = true;

  async onSearchChange(query: string): Promise<void> {
    this.searchQuery = query;
    const result = await firstValueFrom(this.service.search(query));
    
    const currentRoute = this.router.url;
    let speciesFilter: string | undefined;

    if (currentRoute.includes('cachorros')) {
      speciesFilter = 'cachorro';
    } else if (currentRoute.includes('gatos')) {
      speciesFilter = 'gato';
    }

    this.filteredAnimals = result.success && result.data 
      ? speciesFilter 
        ? result.data.filter((animal: Animal) => animal.species.toLowerCase() === speciesFilter) 

        
        : result.data
      : [];
    
    this.showSuggestions = query.length <= 0;
  }

  highlightMatch(text: string, query: string): string {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }

  
  navigateToAnimalProfile(animalId: number): void {
    this.router.navigate(['/animais', animalId]);
    this.showSuggestions = true;
    this.searchQuery = '';
    this.filteredAnimals = [];
  }

}