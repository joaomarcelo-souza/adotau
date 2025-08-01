import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Animal } from '../../animals/models/animal.model';
import { AbstractAnimalService } from '../../animals/services/abstract-animal.service';
import { firstValueFrom } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class Search {

  private service = inject(AbstractAnimalService)
  filteredAnimals: Animal[] = []
  searchQuery: string = ''
  showSuggestions = true

  async onSearchChange(query:string): Promise<void>{
    this.searchQuery = query
    const result = await firstValueFrom(
      this.service.search(query)
    )
    this.filteredAnimals = result.success && result.data ? result.data : []
    this.showSuggestions = query.length <=0
    
  }

  highlightMatch(text: string, query: string): string{
    if(!query) return text
    const regex = new RegExp(`(${query})`,'gi')
    return text.replace(regex,'<strong>$1</strong>')
  }

}
