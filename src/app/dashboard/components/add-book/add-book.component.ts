import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReadingClubBookServiceService } from '../../services/reading-club-book-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddCountryComponent } from '../add-country/add-country.component';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  id:number;
  form:FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  bookId: number | null = null;
  bookImagePreview: string | ArrayBuffer | null = null;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,private readingClubBookservice:ReadingClubBookServiceService,public dialogRef: MatDialogRef<AddBookComponent>,public service:MainDashoardService,private fb: FormBuilder){
    
      this.id = data;
    
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.createForm();
  }
  
  createForm(): void {
    this.form = this.fb.group({
      Title: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      ReadingClubId: [this.id, [Validators.required]],
      BookImage: [null,[Validators.required]]
    });
  }
  
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ BookImage: file });
    }
  }
  


  submit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('Title', this.form.get('Title')?.value);
      formData.append('Description', this.form.get('Description')?.value);
      formData.append('ReadingClubId', this.form.get('ReadingClubId')?.value);
      formData.append('BookImage', this.form.get('BookImage')?.value);

      this.readingClubBookservice.add(formData).subscribe((response) => {
        if (response.statusCode === "200") {
          console.log(response);
          this.service.toastService.success(response.message);
        } else {
          this.service.toastService.error(response.message);
        }
        this.dialogRef.close();
      });
    }
  }
  
}
