import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerReportService } from 'src/app/dashboard/services/volunteer-report.service';
import { environment } from 'src/environments/environment.prod';
import { FilterClubComponent } from '../filter-club/filter-club.component';
import { VolunteerFieldService } from 'src/app/dashboard/services/volunteer-field.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';

@Component({
  selector: 'app-volunteering',
  templateUrl: './volunteering.component.html',
  styleUrls: ['./volunteering.component.css']
})
export class VolunteeringComponent {
  volunteeringReportData:any;
  pageResponse:PagedResponse={page:1,pageSize:15,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:15,name:''};
  items:any[]=[]
  constructor(private volunteerReportService:VolunteerReportService,public dialog: MatDialog,
    private volunteerFieldService:VolunteerFieldService){}
  ngOnInit(): void {
    this.getLastReport();
    this.pagedRequest.id=0;
    this.volunteerFieldService.getPage(this.pagedRequest).subscribe(res=>{
      this.pageResponse=res;
     this.items=this.pageResponse.items;
    })
  }
  getLastReport(){
    this.volunteerReportService.getLast().subscribe((val)=>{
      this.volunteeringReportData = val.data;
      console.log(this.volunteeringReportData);

    })
  }
  goToLink(url: string){
    url = environment.baseImageUrl + url
    console.log(url);
    window.open(url, "_blank");
}
windowWidth: number = 0;
filter(){
  const dialogRef = this.dialog.open(FilterClubComponent, {
    width:this.windowWidth<767?'60%':(this.windowWidth<1300?'50%':'40%'),
    // data:{
    //   id:this.id,
    // }
  });
}
// getPage(){
//   this.volunteerFieldService.getPage(this.pagedRequest).subscribe({
//     next:(res:PagedResponse)=>{
//         this.pageResponse = res;
//         console.log(this.pageResponse);

//     }
//   });
// }
loadData(){
  this.pagedRequest.id=0;
  this.volunteerFieldService.getPage(this.pagedRequest).subscribe(res=>{
    this.pageResponse=res;
   this.items=this.pageResponse.items;
  })
}
next(evetn:number){
  this.pagedRequest = {pageNumber:evetn,pageSize:16,name:''};
  this.ngOnInit()
}
back(event:number){
  this.pagedRequest = {pageNumber:event,pageSize:16,name:''};
  this.loadData()
}
get pagesNumber(): any {
  const totalCount = this.pageResponse.totalCount;
  const pageSize = this.pagedRequest.pageSize;
  return Math.ceil(totalCount / pageSize);
}
}
