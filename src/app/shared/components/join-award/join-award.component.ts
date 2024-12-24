import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { ExcellenceAwardParticipantService } from 'src/app/kafaat/services/excellence-award-participant.service';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { TypeOfAwardService } from 'src/app/kafaat/services/type-of-award.service';
import { SuccessJoinComponent } from '../success-join/success-join.component';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { GetGradesService } from 'src/app/kafaat/services/get-grades.service';
import { GetAveragesService } from 'src/app/kafaat/services/get-averages.service';
import { ResponseOfJoinComponent } from '../response-of-join/response-of-join.component';

@Component({
  selector: 'app-join-award',
  templateUrl: './join-award.component.html',
  styleUrls: ['./join-award.component.css']
})
export class JoinAwardComponent {
  form:FormGroup = new FormGroup({});
  AwardId:number;
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:1,name:''};
  typeOfAward:any[];
  UserId:any;
  grades:any[];
  averages:any[];
  constructor(public dialogRef: MatDialogRef<JoinAwardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:KafaatMainService,private excellenceAwardParticipantService:ExcellenceAwardParticipantService,
    private dialog:MatDialog,private typeOfAwardService:TypeOfAwardService,private getGradesService:GetGradesService,private getAveragesService:GetAveragesService ){

this.AwardId=data.id
let _user = this.service.authService.currentUser();
let id = _user.id;
this.UserId=id;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
    windowWidth:number=0
  ngOnInit(): void {
    this.loadTypeOfAward();
    this.loadAverages();
    this.loadGrades();
    this.createForm();
  }
  loadTypeOfAward(){
   this.pagedRequest={pageNumber:1,pageSize:20,name:'',id:this.AwardId};
    this.typeOfAwardService.getPage(this.pagedRequest).subscribe({

         next:(res:PagedResponse)=>{
          this.typeOfAward=res.items;
         }
        })
        }
        selectedFile: File | null = null;
        onFileSelected(event: any) {
          this.selectedFile = event.target.files[0];
        }
loadGrades(){
this.getGradesService.getAll().subscribe(res=>{
  this.grades=res.data;
})
}
loadAverages(){
  this.getAveragesService.getAll().subscribe(res=>{
    this.averages=res.data;
  })
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      grade:['',[Validators.required]],
      average:['',[Validators.required]],
      participantId:[this.UserId,[Validators.required]],
      isApproved:[false,[Validators.required]],
      typeOfAwardId:['',[Validators.required]],
      documentFilePath:[null,[Validators.required]],
      applicationNumber:['',[Validators.required]],
      notes:[null,[Validators.required]],
      reasonOfReject:[null,[Validators.required]],
    });
  }
  get grade() {
    return this.form.controls['grade'];
  }
  get average() {
    return this.form.controls['average'];
  }
  get typeOfAwardId() {
    return this.form.controls['typeOfAwardId'];
  }
  get documentFilePath() {
    return this.form.controls['documentFilePath'];
  }


  submit(){


      const formData = new FormData();
      formData.append('documentFilePath',this.selectedFile);
      formData.append('grade', this.form.value.grade);
      formData.append('average', this.form.value.average);
      formData.append('participantId', this.UserId);
      formData.append('isApproved', 'false');
      formData.append('typeOfAwardId', this.form.value.typeOfAwardId);
      formData.append('applicationNumber', '123');
      formData.append('notes', null);
      formData.append('reasonOfReject', null);
      this.excellenceAwardParticipantService.join(formData).pipe(
        catchError((error) => {
          console.error(error);
          this.service.toastService.error('افحص السيرفر');
          this.dialogRef.close();
          return throwError(error);
        })
      ).subscribe((response) => {
        if(response.statusCode=="200"){
          this.dialogRef.close();
          console.log(response);
          const dialogRef = this.dialog.open(SuccessJoinComponent, {
            width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
          });
        }else{
          this.dialogRef.close();
          this.service.toastService.error(response.message);
          const dialogRef = this.dialog.open(ResponseOfJoinComponent, {
            width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
            data:this.form.value.typeOfAwardId
          });

        }
      });
    }

  //}
}
