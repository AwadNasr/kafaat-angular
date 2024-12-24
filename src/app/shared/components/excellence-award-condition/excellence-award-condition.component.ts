import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AwardConditionsService } from 'src/app/dashboard/services/award-conditions.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';

@Component({
  selector: 'app-excellence-award-condition',
  templateUrl: './excellence-award-condition.component.html',
  styleUrls: ['./excellence-award-condition.component.css']
})
export class ExcellenceAwardConditionComponent implements OnChanges,OnInit {
  @Input() sharedId: number;
  newId:number
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:10,name:''};
  constructor(private awardConditionsService:AwardConditionsService) {
    this.newId=this.sharedId;
  }
  ngOnInit(): void {
          this.newId=this.sharedId;
          console.log('ID changed in Component B:', this.sharedId);
          this.pagedRequest= {pageNumber:1,pageSize:10,name:'',id:this.newId};
          //this.getPage();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.newId=this.sharedId;
          console.log('ID changed in Component B:', this.newId);
          this.pagedRequest= {pageNumber:1,pageSize:10,name:'',id:this.newId};
          this.getPage();
  }
  getPage(){

    this.awardConditionsService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
          console.log(this.pageResponse);
      }
    });
  }




}
