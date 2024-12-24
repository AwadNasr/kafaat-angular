import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VolunteerFieldParticipantService } from 'src/app/dashboard/services/volunteer-field-participant.service';
import { ExcellenceAwardParticipantService } from 'src/app/kafaat/services/excellence-award-participant.service';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { TypeOfAwardService } from 'src/app/kafaat/services/type-of-award.service';
import { TypeOfVolunteeringService } from 'src/app/kafaat/services/type-of-volunteering.service';
import { SuccessJoinComponent } from '../success-join/success-join.component';

@Component({
  selector: 'app-join-volunteer',
  templateUrl: './join-volunteer.component.html',
  styleUrls: ['./join-volunteer.component.css']
})
export class JoinVolunteerComponent implements OnInit {
userId:any
fieldId:any
form:FormGroup = new FormGroup({});
typesOfVolunteer:any
  constructor(public dialogRef: MatDialogRef<JoinVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:KafaatMainService,private volunteerFieldParticipantService:VolunteerFieldParticipantService,
    private dialog:MatDialog,private typeOfVolunteeringService:TypeOfVolunteeringService ){
this.fieldId=data.id
let _user = this.service.authService.currentUser();
let id = _user.id;
this.userId=id;
    }
  ngOnInit(): void {
    this.loadTypesOfVolunteer();
    this.createForm();
  }
    closeDialog(): void {
      this.dialogRef.close();
    }

    loadTypesOfVolunteer(){
      this.typeOfVolunteeringService.getAll().subscribe(res=>{
        this.typesOfVolunteer=res.data;
      })
    }
    createForm(){
      this.form = this.service.formBuilder.group({
        isApprove:[false,[Validators.required]],
        name:['string',[Validators.required]],
        days:[0,[Validators.required]],
        description:['string',[Validators.required]],
        hours:[0,[Validators.required]],
        typeOfVolunteering:['',[Validators.required]],
        amountOfRiyal:[0,[Validators.required]],
        participantId:[this.userId,[Validators.required]],
        volunteeringFieldId:[this.fieldId,[Validators.required]],
      });
    }
    get typeOfVolunteering() {
      return this.form.controls['typeOfVolunteering'];
    }
    windowWidth:number=0
    submit(){
      if(this.form.valid){


      this.volunteerFieldParticipantService.join(this.form.value).subscribe({
        next:(res=>{
          if(res.statusCode=="200"){
            this.dialogRef.close();
            const dialogRef = this.dialog.open(SuccessJoinComponent, {
              width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
            });
          }else{
            this.service.toastService.error(res.message);
            this.dialogRef.close();
          }
        })
      })

    }
  }
}
