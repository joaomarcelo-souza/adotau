import { Component, inject } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractUserService } from '../service/abstract-user.service';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { OperationResult } from '../../models/operation-result.model';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatCard, MatInputModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginForm {
  
  private fb = inject(FormBuilder);
  private userService = inject(AbstractUserService);
  private router = inject(Router);
  private feedbackService = inject(FeedbackService);

  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const credentials = this.loginForm.value;

    this.userService.login(credentials).subscribe({
      next: (result: OperationResult) => {
        this.isLoading = false;
        if (result.success) {
          this.router.navigate(['/']);
          this.feedbackService.success('Login realizado com sucesso!');
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
      case 401:
        message = 'Credenciais inválidas';
        break;
      case 403:
        message = 'Acesso negado';
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
