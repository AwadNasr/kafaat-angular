//import { VolunteerFieldParticipantService } from './../../../dashboard/services/volunteer-field-participant.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { VolunteerFieldParticipantService } from 'src/app/dashboard/services/volunteer-field-participant.service';
import { VolunteerFieldService } from 'src/app/dashboard/services/volunteer-field.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { JoinVolunteerComponent } from '../join-volunteer/join-volunteer.component';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Component({
  selector: 'app-volunteer-field',
  templateUrl: './volunteer-field.component.html',
  styleUrls: ['./volunteer-field.component.css']
})
export class VolunteerFieldComponent implements OnInit {
  field:any;
  fieldImage:string
  id:number;
  pageResponse:PagedResponse={page:1,pageSize:12,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:12,name:''};
  items:any[]=[]
  IsParticipant:boolean=false;
  constructor(private volunteerFieldService:VolunteerFieldService,private route:ActivatedRoute,private router: Router,
    private volunteerFieldParticipantService:VolunteerFieldParticipantService,public dialog: MatDialog,private service:KafaatMainService,
  ){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
  }
  isParticipant(){
    let _user = this.service.authService.currentUser();
    let userId = _user.id;
    const model={
      readingClubId:this.id,
      participantId:userId
    }
    console.log(model);

    this.volunteerFieldParticipantService.isParticipant(model).subscribe((res:any)=>{
      // next:(res:boolean)=>{
      //console.log(res);

        this.IsParticipant=res
//console.log(this.IsParticipant);

      // }
    }
    )
  }
  loadField(){
    this.volunteerFieldService.getById(this.id).subscribe(res=>{
     this.field=res.data;
     this.fieldImage=this.baseImageUrl+res.data.fieldImage
    })
    this.isParticipant();
  }
  baseImageUrl:string='http://localhost:8081/'
  loadData(){
    this.pagedRequest.id=this.id;
    this.volunteerFieldParticipantService.getPage(this.pagedRequest).subscribe(res=>{
      this.pageResponse=res;
     this.items=this.pageResponse.items;
    })
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:13,name:''};
    this.ngOnInit()
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:13,name:''};
    this.loadData()
  }
  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;
    return Math.ceil(totalCount / pageSize);
  }
  ngOnInit(){
    this.loadField();


    this.pagedRequest.id=this.id;
    this.volunteerFieldParticipantService.getPage(this.pagedRequest).subscribe(res=>{
      this.pageResponse=res;
     this.items=this.pageResponse.items;
  })
}
navigateToParticipant(userId:string){
  this.router.navigate(['/kafaat/volunteer-participant', userId,this.id]);
}
windowWidth: number = 0;
joinVolunteer(){
  const dialogRef = this.dialog.open(JoinVolunteerComponent, {
    width:this.windowWidth<767?'80%':(this.windowWidth<1300?'50%':'40%'),
    data:{
      id:this.id,
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    this.ngOnInit();
  });
}


}
