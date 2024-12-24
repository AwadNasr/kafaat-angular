import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddParticipantVolunteerComponent } from '../add-participant-volunteer/add-participant-volunteer.component';
import { ReadingClubTripsParticipantsService } from '../../services/reading-club-trips-participants.service';

@Component({
  selector: 'app-add-participant-club',
  templateUrl: './add-participant-club.component.html',
  styleUrls: ['./add-participant-club.component.css']
})
export class AddParticipantClubComponent {
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
    private dialogRef: MatDialogRef<AddParticipantClubComponent>,private ReadingClubTripsParticipantsService:ReadingClubTripsParticipantsService) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
  }
  async ngOnInit(): Promise<void> {

    this.createForm();
    this.loadSupervisors();
    this.filterSupervisor.valueChanges.subscribe(newValue => {
      this.supervisors = this.supervisorsFilter.filter(value => value.displayName.includes(newValue.filterInput2));
    });
  }
  filterSupervisors(){
    this.supervisors = this.supervisorsCopy;

  }
  loadSupervisors(){
    this.service.accountService.getAll().subscribe(response=>{
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
      readingClubTripId:[this.data,[Validators.required]],
        participantId:[null,[Validators.required]],
        isApproved:[true,[Validators.required]],
        isHero:[false,[Validators.required]],
        badge:['',[Validators.required]],
        benefits:[0,[Validators.required]]
    });

  this.filter = this.service.formBuilder.group({
    filterInput: ['']
  })
  this.filterSupervisor=this.service.formBuilder.group({
    filterInput2:['']
  })
}
get participantId() {
  return this.form.controls['participantId'];
}
get filterInput() {
  return this.filter.controls['filterInput'];
}
get filterInput2(){
  return  this.filterSupervisor.controls['filterInput2'];
}
submit() {
 // if (this.form.valid) {
    const formData = new FormData();
    formData.append('readingClubTripId', this.form.value.readingClubTripId);
    formData.append('participantId', this.form.value.participantId);
    formData.append('isApproved', this.form.value.isApproved);
    formData.append('isHero', this.form.value.isHero);
    formData.append('badge', this.form.value.badge);
    formData.append('benefits', this.form.value.benefits);
      this.ReadingClubTripsParticipantsService.joinClub(this.form.value).subscribe({
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
   //}

  // else {
  //   Object.keys(this.form.controls).forEach(key => {
  //     if (this.form.controls[key].invalid) {
  //       let fieldName = '';
  //       switch (key) {
  //         case 'participantId':
  //           fieldName = 'اسم المشارك';
  //           break;
  //       }
  //       this.service.toastService.error(`الرجاء ادخال ${fieldName}`);
  //     }
  //   });
  // }
}
closeDialog(): void {
  this.dialogRef.close();
}
}
