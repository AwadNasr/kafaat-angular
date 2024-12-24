import { ReadingClubService } from 'src/app/dashboard/services/reading-club.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { catchError, throwError } from 'rxjs';
import { ReadingClubReportService } from '../../services/reading-club-report.service';
import { SuccessJoinComponent } from 'src/app/shared/components/success-join/success-join.component';

@Component({
  selector: 'app-join-club',
  templateUrl: './join-club.component.html',
  styleUrls: ['./join-club.component.css']
})
export class JoinClubComponent {
  form:FormGroup = new FormGroup({});
constructor(public dialogRef: MatDialogRef<JoinClubComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,private service:KafaatMainService,private readingClubService:ReadingClubService,private dialog:MatDialog){}
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
      readingClubId:[this.data.id,[Validators.required]],
      participantId:[id,[Validators.required]],
      isApproved:[true,[Validators.required]],
      isHero:[false,[Validators.required]]
    });
  }

  submit(){
    this.dialogRef.close();
    this.readingClubService.joinClub(this.form.value).pipe(
      catchError((error) => {
        console.error(error);
        this.service.toastService.error('افحص السيرفر');
        return throwError(error);
      })
    ).subscribe((response) => {
      if(response.statusCode=="200"){
        console.log(response);
        //this.service.toastService.success(response.message)
       // this.service.router.navigate(['/kafaat/success-join']);
        const dialogRef = this.dialog.open(SuccessJoinComponent, {
          width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        });

      }else{
        this.service.toastService.error(response.message);
      }
    });
  }
}
