import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { Search } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIcon,
    RouterModule,
    Search
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class Navbar {
  authService = inject(AuthService);
  router = inject(Router);
  private feedbackService = inject(FeedbackService);

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.feedbackService.success('Deslogou com sucesso');
  }
}
