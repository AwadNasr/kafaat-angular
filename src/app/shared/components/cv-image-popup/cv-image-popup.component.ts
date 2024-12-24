import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cv-image-popup',
  templateUrl: './cv-image-popup.component.html',
  styleUrls: ['./cv-image-popup.component.css']
})
export class CvImagePopupComponent implements OnInit {
  image:any;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<CvImagePopupComponent>){}
  ngOnInit(): void {
    this.image = this.data.cvImage;
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

}
