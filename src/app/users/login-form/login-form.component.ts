import { Component, inject } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AbstractUserService } from '../service/abstract-user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatCard, MatInputModule,  MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private userService = inject(AbstractUserService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

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
    next: (result) => {
      this.isLoading = false;
      if (result.sucess) {
        this.router.navigate(['/']); 
      } else {
        this.showError(result.error || 'Credenciais inválidas');
      }
    },
      error: () => {
        this.isLoading = false;
        this.showError('Erro na conexão com o servidor');
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
  
}
