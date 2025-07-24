import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FeedbackService } from '../feedback/feedback.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const feedbackService = inject(FeedbackService);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    feedbackService.error('Você precisa estar logado para acessar esta página.');
    router.navigate(['/']);
    return false;
  }
};
