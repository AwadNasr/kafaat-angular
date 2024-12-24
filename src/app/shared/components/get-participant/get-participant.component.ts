import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerFieldParticipantService } from 'src/app/dashboard/services/volunteer-field-participant.service';

@Component({
  selector: 'app-get-participant',
  templateUrl: './get-participant.component.html',
  styleUrls: ['./get-participant.component.css']
})
export class GetParticipantComponent implements OnInit {
  participantId:any
  volunteerFieldId:any
  participant:any
  constructor(private route:ActivatedRoute,private router: Router,
    private volunteerFieldParticipantService:VolunteerFieldParticipantService
  ){
    this.route.params.subscribe(params => {
      this.participantId = params['userId'];
      this.volunteerFieldId = params['id'];
    });
    console.log(this.participantId);
    console.log(this.volunteerFieldId);
  }
  ngOnInit(): void {
   const model={participantId:this.participantId,volunteerFiealdId:this.volunteerFieldId}
this.getParticipant(model);
  }
  getParticipant(model:any){
    this.volunteerFieldParticipantService.getParticipant(model).subscribe({
      next:(res:any)=>{
        this.participant=res.data[0];
        console.log(this.participant);

      }
     }
  )
  }

}
