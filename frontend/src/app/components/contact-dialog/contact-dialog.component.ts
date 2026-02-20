// contact-dialog.component.ts
import { Component, computed, inject } from '@angular/core';
import { AbstractAnimalService } from '../../animals/services/abstract-animal.service';
import { AbstractUserService } from '../../users/service/abstract-user.service';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FeedbackService } from '../../services/feedback/feedback.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contact-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss',
})
export class ContactDialog {
  private animalService = inject(AbstractAnimalService);
  private userService = inject(AbstractUserService);
  private feedbackService = inject(FeedbackService);
  private dialogRef = inject(MatDialogRef<ContactDialog>);

  constructor() {
    this.animalId = inject(MAT_DIALOG_DATA).animalId;
  }

  animalId: number;

  animal = computed(() => {
    return this.animalService.getAnimalById(this.animalId)();
  });

  isLoading = computed(() => !this.animal());

  user = computed(() => {
    const donor_id = this.animal()?.donor_id;
    if (!donor_id) return undefined;
    return this.userService.getUserById(donor_id)();
  });

  contactViaWhatsApp(): void {
    const phone = this.user()?.phone;
    if (phone) {
      const phoneString = phone.toString().replace(/\D/g, '');
      window.open(`https://wa.me/${phoneString}`, '_blank');
    } else {
      this.feedbackService.error(
        'Número de telefone não disponível para contato via WhatsApp.',
      );
    }
  }

  contactViaEmail(): void {
    const email = this.user()?.email;
    if (email) {
      window.open(`mailto:${email}`, '_blank');
    } else {
      this.feedbackService.error('Email não disponível para contato.');
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
