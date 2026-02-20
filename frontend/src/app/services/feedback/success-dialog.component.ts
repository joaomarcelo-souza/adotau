import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Sucesso</h2>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>OK</button>
    </div>
  `,
})
export class SuccessDialog {
  constructor() {
    this.data = inject(MAT_DIALOG_DATA);
  }

  data: { message: string };
}
