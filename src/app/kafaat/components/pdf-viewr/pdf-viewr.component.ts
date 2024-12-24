import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pdf-viewr',
  templateUrl: './pdf-viewr.component.html',
  styleUrls: ['./pdf-viewr.component.css']
})
export class PdfViewrComponent {

  pdfUrl = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<PdfViewrComponent>) {
      this.pdfUrl= data.cvPdf;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
