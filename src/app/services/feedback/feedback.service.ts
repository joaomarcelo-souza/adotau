import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SuccessDialog } from "./success-dialog.component";
import { ErrorDialog } from "./error-dialog.component";
import { OperationResult } from "../../models/operation-result.model";

@Injectable({ providedIn: "root" })
export class FeedbackService {
    constructor(private dialog: MatDialog) {}

    showResult(result: OperationResult): void {
        if (result.success) {
            this.success('Operação realizada com sucesso!');
        } else {
            this.error(result.error || 'Ocorreu um erro durante a operação.');
        }
    }

    success(message: string): void {
        this.dialog.open(SuccessDialog, { data: { message } });
    }

    error(message: string): MatDialogRef<ErrorDialog> {
        return this.dialog.open(ErrorDialog, { data: { message } });
    }

}
