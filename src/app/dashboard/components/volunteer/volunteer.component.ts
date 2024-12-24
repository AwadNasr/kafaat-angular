import { Component } from '@angular/core';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:'',id:0};
  getPage(){
    // this.excellenceAwardService.getPage(this.pagedRequest).subscribe({
    //   next:(res:PagedResponse)=>{
    //       this.pageResponse = res;
    //       console.log(this.pageResponse);
    //   }
    // });
  }
  getPageByName(){
    this.getPage();
  }

  changePageSize(){
    this.pagedRequest.pageNumber = 1;
    this.getPage();
  }
  changePageNumber(event:any){
    this.pagedRequest.pageNumber = event;
    this.getPage();
  }
  addItem(): void {
    // const dialogRef = this.service.dialog.open(AddExcellenceClubComponent, {
    //   width:this.windowWidth<767?'70%':(this.windowWidth<1300?'50%':'40%'),
    //   height:'70vh'
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   this.getPage();
    // });

  }
}
