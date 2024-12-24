import { Component, Inject, OnInit, Type } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ExcellenceAwardParticipantService } from 'src/app/kafaat/services/excellence-award-participant.service';
import { GetAveragesService } from 'src/app/kafaat/services/get-averages.service';
import { GetGradesService } from 'src/app/kafaat/services/get-grades.service';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { TypeOfAwardService } from 'src/app/kafaat/services/type-of-award.service';
import { JoinAwardComponent } from '../join-award/join-award.component';

@Component({
  selector: 'app-response-of-join',
  templateUrl: './response-of-join.component.html',
  styleUrls: ['./response-of-join.component.css']
})
export class ResponseOfJoinComponent implements OnInit {
  userid:any;
  typeOfAwardId:any;
  response:any
  constructor(public dialogRef: MatDialogRef<JoinAwardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private service:KafaatMainService,private excellenceAwardParticipantService:ExcellenceAwardParticipantService,
    private dialog:MatDialog,private typeOfAwardService:TypeOfAwardService,private getGradesService:GetGradesService,private getAveragesService:GetAveragesService ){

this.typeOfAwardId=data;
let _user = this.service.authService.currentUser();
let id = _user.id;
this.userid=id;
    }
  ngOnInit(): void {
   this.getResponse();
  }
    getResponse(){
      let model={readingClubId:this.typeOfAwardId,participantId:this.userid}
      this.excellenceAwardParticipantService.getResponse(model).subscribe(res=>{
        this.response=res;
      })
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
}
