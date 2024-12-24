import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExcellenceAwardParticipantService } from 'src/app/kafaat/services/excellence-award-participant.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';

@Component({
  selector: 'app-excellence-award-participant',
  templateUrl: './excellence-award-participant.component.html',
  styleUrls: ['./excellence-award-participant.component.css']
})
export class ExcellenceAwardParticipantComponent {
  id:number
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(private excellenceAwardParticipantService:ExcellenceAwardParticipantService,private service: MainDashoardService,
    private route: ActivatedRoute,
  ){
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.pagedRequest.id=this.id;
    this.getPage();
  }
getPage(){
  this.excellenceAwardParticipantService.getPage(this.pagedRequest).subscribe({
    next:(res:PagedResponse)=>{
        this.pageResponse = res;
       
    }
  });
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

}
