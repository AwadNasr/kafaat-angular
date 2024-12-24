import { Component } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { PagedRequest } from '../../core/models/paged-request';
import { PagedResponse } from '../../core/models/paged-response';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-posts-slides',
  templateUrl: './posts-slides.component.html',
  styleUrls: ['./posts-slides.component.css']
})
export class PostsSlidesComponent {

  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:16,name:''};
  items:any
constructor(private service:KafaatMainService) {

}
  ngOnInit(): void {
    this.pagedRequest.id=0;
    this.loadData();
  }

  onselect(event:number){
    if(event>0){
      this.pagedRequest.id=event;
      this.loadData();
    }else{
      this.pagedRequest.id=0;
      this.loadData();
    }
  }
  loadData(){
    this.service.programService.getAllShares(this.pagedRequest).subscribe(response=>{
     this.pageResponse=response;
     this.items=this.pageResponse.items;
     this.items.forEach((element: { imagePath: any; }) => {
      element.imagePath =  environment.baseImageUrl + element.imagePath
     });
    })
  }
  loadDataById(){
    this.service.programService.getAllSharesById(this.pagedRequest).subscribe(response=>{
      this.pageResponse=response;
      this.items=this.pageResponse.items;
     })
  }

  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;



    return Math.ceil(totalCount / pageSize);
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:16,name:''};
    this.loadData()
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:16,name:''};
    this.loadData()
  }
}
