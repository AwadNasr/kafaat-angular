import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-pdf-popup',
  templateUrl: './pdf-popup.component.html',
  styleUrls: ['./pdf-popup.component.css'],
  standalone:true,
imports:[PdfViewerModule]
})
export class PdfPopupComponent implements AfterViewInit {
  baseURL:string='';
  pdfUrl = '';
  url:string='';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<PdfPopupComponent>) {
    this.pdfUrl= data.cvPdf.split('/')[data.cvPdf.split('/').length-1] ;
    this.baseURL = environment.baseApiUrl;
    this.url = this.baseURL+"/account/"+this.pdfUrl;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
	
	}
}
