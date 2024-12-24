import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { VolunteerFieldParticipantsService } from 'src/app/dashboard/services/volunteer-field-participants.service';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { JoinReadClubComponent } from '../join-read-club/join-read-club.component';
import { catchError, throwError } from 'rxjs';
import { SuccessJoinComponent } from 'src/app/shared/components/success-join/success-join.component';

@Component({
  selector: 'app-join-volunteer-field',
  templateUrl: './join-volunteer-field.component.html',
  styleUrls: ['./join-volunteer-field.component.css']
})
export class JoinVolunteerFieldComponent {
  form:FormGroup = new FormGroup({});
  constructor(public dialogRef: MatDialogRef<JoinVolunteerFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:KafaatMainService,private VolunteerFieldParticipantsService:VolunteerFieldParticipantsService,private dialog:MatDialog){}
    closeDialog(): void {
      this.dialogRef.close();
    }
    windowWidth:number=0
    ngOnInit(): void {
      this.createForm();
    }
    createForm() {
      let _user = this.service.authService.currentUser();
      let id = _user.id;
      this.form = this.service.formBuilder.group({
        VolunteerFieldId: [this.data],
        VolunteerHours: [0],
        ActualHours: [0],
        ParticipantId: [id],
        Reward: [null],
        IsSupervisor: [false],
        IsApprove: [false],
      });
  }
  submit(){
    this.dialogRef.close();
    const formData = new FormData();
    formData.append('VolunteerFieldId', this.form.value.VolunteerFieldId);
    formData.append('VolunteerHours', this.form.value.VolunteerHours);
    formData.append('ActualHours', this.form.value.ActualHours);
    formData.append('ParticipantId', this.form.value.ParticipantId);
    formData.append('Reward', this.form.value.Reward);
    formData.append('IsSupervisor', this.form.value.IsSupervisor);
    formData.append('IsApprove', this.form.value.IsApprove);
    this.VolunteerFieldParticipantsService.join(formData).pipe(
      catchError((error) => {
        console.error(error);
        this.service.toastService.error('افحص السيرفر');
        return throwError(error);
      })
    ).subscribe((response) => {
      if(response.statusCode=="200"){
        console.log(response);
        const dialogRef = this.dialog.open(SuccessJoinComponent, {
          width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        });

      }else{
        this.service.toastService.error(response.message);
      }
    });
  }
}
