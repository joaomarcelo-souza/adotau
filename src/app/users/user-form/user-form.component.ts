import { MatIconModule } from '@angular/material/icon';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../models/user.model'; // Supondo que você tenha um modelo User
import { AbstractUserService } from '../service/abstract-user.service'; // Supondo que você tenha um serviço de usuário
import { Router, ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OperationResult } from '../../models/operation-result.model';
import { Navbar } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    Navbar
],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserForm implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(AbstractUserService);
  private router = inject(Router);
  private feedbackService = inject(FeedbackService);
  private route = inject(ActivatedRoute);

  userForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  currentUserId: number | null = null;
  currentUser: User | null = null;

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
      phone: ['', Validators.required],
      type_user: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', [Validators.required, Validators.maxLength(2)]],
      neighborhood: ['', Validators.required],
      photoUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.currentUserId = +userId;
      this.loadUser(this.currentUserId);
    }
  }

  private loadUser(id: number): void {
    const user = this.userService.getUserById(id)();
    if (user) {
      this.currentUser = user;
      this.userForm.patchValue({
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        type_user: user.type_user,
        city: user.city,
        state: user.state,
        neighborhood: user.neighborhood,
        photoUrl: user.photoUrl,
      });
    } else {
      this.feedbackService.error('Usuário não encontrado');
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.isLoading = true;
    const userData = this.userForm.value;

    if (this.isEditMode && this.currentUserId && this.currentUser) {
      const updatedUser: User = {
        ...this.currentUser,
        ...userData,
      };
      this.updateUser(updatedUser);
    } else {
      this.createUser(userData);
    }
  }

  private updateUser(user: User): void {
    this.userService.update(user).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.success) {
          this.feedbackService.success('Perfil atualizado com sucesso!');
          this.router.navigate(['/profile']);
        } else {
          this.handleError(result);
        }
      },
      error: () => {
        this.isLoading = false;
        this.feedbackService.error('Erro na conexão com o servidor');
      },
    });
  }

  private createUser(userData: Omit<User, 'id'>): void {
    this.userService.add(userData).subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.success) {
          this.feedbackService.success('Usuário cadastrado com sucesso!');
          this.router.navigate(['/profile']);
        } else {
          this.handleError(result);
        }
      },
      error: () => {
        this.isLoading = false;
        this.feedbackService.error('Erro na conexão com o servidor');
      },
    });
  }

  private handleError(result: OperationResult): void {
    let message = 'Ocorreu um erro';
    switch (result.status) {
      case 400:
        message = 'Dados inválidos';
        break;
      case 404:
        message = 'Usuário não encontrado';
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