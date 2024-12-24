import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { SuccessJoinComponent } from 'src/app/shared/components/success-join/success-join.component';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { ReadingClubService } from '../../services/reading-club.service';
import { JoinClubComponent } from '../join-club/join-club.component';
import { ReadingClubTripParticipantsComponent } from 'src/app/dashboard/components/reading-club-trip-participants/reading-club-trip-participants.component';
import { ReadingClubTripsParticipantsService } from 'src/app/dashboard/services/reading-club-trips-participants.service';

@Component({
  selector: 'app-join-read-club',
  templateUrl: './join-read-club.component.html',
  styleUrls: ['./join-read-club.component.css']
})
export class JoinReadClubComponent {
  form:FormGroup = new FormGroup({});
  constructor(public dialogRef: MatDialogRef<JoinReadClubComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:KafaatMainService,private ReadingClubTripsParticipantsService:ReadingClubTripsParticipantsService,private dialog:MatDialog){}
    closeDialog(): void {
      this.dialogRef.close();
    }
    windowWidth:number=0
    ngOnInit(): void {
      this.createForm();
    }
    createForm(){
      let _user = this.service.authService.currentUser();
      let id = _user.id;
      console.log(id);
      console.log(this.data);
      this.form = this.service.formBuilder.group({
        readingClubTripId:[this.data,[Validators.required]],
        participantId:[id,[Validators.required]],
        isApproved:[true,[Validators.required]],
        isHero:[false,[Validators.required]],
        badge:['',[Validators.required]],
        benefits:[0,[Validators.required]]
      });
    }
  
    submit(){
      this.dialogRef.close();
      this.ReadingClubTripsParticipantsService.joinClub(this.form.value).pipe(
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
