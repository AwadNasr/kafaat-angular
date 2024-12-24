import { CategoryBooksService } from 'src/app/dashboard/services/category-books.service';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddParticipantVolunteerComponent } from '../add-participant-volunteer/add-participant-volunteer.component';
import { ReadingClubTripBooksService } from '../../services/reading-club-trip-books.service';

@Component({
  selector: 'app-add-book-to-club-trip',
  templateUrl: './add-book-to-club-trip.component.html',
  styleUrls: ['./add-book-to-club-trip.component.css']
})
export class AddBookToClubTripComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  supervisorValue:string = "";
  supervisorsCopy:any[]=[];
  supervisors:any[]
  supervisorsFilter:any[]
  filterSupervisor:FormGroup = new FormGroup({});
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddBookToClubTripComponent>,private ReadingClubTripBooksService:ReadingClubTripBooksService
  ,private CategoryBooksService:CategoryBooksService) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
  }
  async ngOnInit(): Promise<void> {
    this.createForm();
    this.loadSupervisors();
    this.filterSupervisor.valueChanges.subscribe(newValue => {
      this.supervisors = this.supervisorsFilter.filter(value => value.title.includes(newValue.filterInput2));
    });
  }
  filterSupervisors(){
    this.supervisors = this.supervisorsCopy;

  }
  loadSupervisors(){
    this.CategoryBooksService.getAll().subscribe(response=>{
      if(response.statusCode=="200"){
        this.supervisorsFilter=response.data;
        this.supervisors=response.data;
        this.supervisorsCopy = this.supervisors;
      }
    }
    );
  }
  createForm() {
    this.form = this.service.formBuilder.group({
      ReadingClubTripId: [this.data],
      BookId: [null,[Validators.required]],
    });
  this.filter = this.service.formBuilder.group({
    filterInput: ['']
  })
  this.filterSupervisor=this.service.formBuilder.group({
    filterInput2:['']
  })
}
get ReadingClubTripId() {
  return this.form.controls['ReadingClubTripId'];
}
get BookId() {
  return this.form.controls['BookId'];
}
get filterInput() {
  return this.filter.controls['filterInput'];
}
get filterInput2(){
  return  this.filterSupervisor.controls['filterInput2'];
}
submit() {
  if (this.form.valid) {
    const formData = new FormData();
    formData.append('ReadingClubTripId', this.form.value.ReadingClubTripId);
    formData.append('BookId', this.form.value.BookId);
      this.ReadingClubTripBooksService.add(formData).subscribe({
        next: (response: any) => {
          if (response.statusCode == 200) {
            this.service.toastService.success(response.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(response.message);
          }
        },
        error: (error) => {
          this.service.toastService.error(error);
        }
      })
    }

  else {
    Object.keys(this.form.controls).forEach(key => {
      if (this.form.controls[key].invalid) {
        let fieldName = '';
        switch (key) {
          case 'BookId':
            fieldName = 'اسم الكتاب';
            break;
        }
        this.service.toastService.error(`الرجاء ادخال ${fieldName}`);
      }
    });
  }
}
closeDialog(): void {
  this.dialogRef.close();
}
}
