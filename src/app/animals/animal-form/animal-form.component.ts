import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Animal } from '../models/animal.model';
import { AbstractAnimalService } from '../services/abstract-animal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OperationResult } from '../../models/operation-result.model';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss']
})
export class AnimalForm implements OnInit {
  private fb = inject(FormBuilder);
  private animalService = inject(AbstractAnimalService);
  private router = inject(Router);
  private feedbackService = inject(FeedbackService);
  private route = inject(ActivatedRoute);

  animalForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  currentAnimalId: number | null = null;
  currentAnimal: Animal | null = null;

  constructor() {
    this.animalForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      sex: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      size: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      neighborhood: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    if (animalId) {
      this.isEditMode = true;
      this.currentAnimalId = +animalId;
      this.loadAnimal(this.currentAnimalId);
    }
  }

  private loadAnimal(id: number): void {
    const animal = this.animalService.getAnimalById(id)();
    if (animal) {
      this.currentAnimal = animal;
      this.animalForm.patchValue({
        name: animal.name,
        species: animal.species,
        sex: animal.sex,
        age: animal.age,
        size: animal.size,
        description: animal.description,
        city: animal.city,
        neighborhood: animal.neighborhood
      });
    } else {
      this.feedbackService.error('Animal não encontrado');
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.animalForm.invalid) {
      return;
    }

    this.isLoading = true;
    const animalData = this.animalForm.value;

    if (this.isEditMode && this.currentAnimalId && this.currentAnimal) {
      const updatedAnimal: Animal = {
        ...this.currentAnimal,
        ...animalData
      };
      this.updateAnimal(updatedAnimal);
    } else {
      this.createAnimal(animalData);
    }
  }

  private updateAnimal(animal: Animal): void {
    this.animalService.update(animal).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.success) {
          this.feedbackService.success('Animal atualizado com sucesso!');
          this.router.navigate(['/profile']);
        } else {
          this.handleError(result);
        }
      },
      error: () => {
        this.isLoading = false;
        this.feedbackService.error('Erro na conexão com o servidor');
      }
    });
  }

  private createAnimal(animalData: Omit<Animal, 'id'>): void {
    this.animalService.add(animalData).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.success) {
          this.feedbackService.success('Animal cadastrado com sucesso!');
          this.router.navigate(['/profile']);
        } else {
          this.handleError(result);
        }
      },
      error: () => {
        this.isLoading = false;
        this.feedbackService.error('Erro na conexão com o servidor');
      }
    });
  }

  private handleError(result: OperationResult): void {
    let message = 'Ocorreu um erro';
    switch (result.status) {
      case 400:
        message = 'Dados inválidos';
        break;
      case 404:
        message = 'Animal não encontrado';
        break;
      case 500:
        message = 'Erro interno do servidor';
        break;
      default:
        message = result.error || 'Erro desconhecido';
    }
    this.feedbackService.error(message);
  }
}