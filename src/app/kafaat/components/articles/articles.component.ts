import { Component } from '@angular/core';
import { PagedResponse } from '../../core/models/paged-response';
import { PagedRequest } from '../../core/models/paged-request';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  pageResponse:PagedResponse={page:1,pageSize:15,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:15,name:''};
  items:any[]=[]
  constructor(private service:MainDashoardService,private router: Router) {

  }
  ngOnInit(): void {
    this.pagedRequest.id=0;
    this.service.articleService.getPageAsync(this.pagedRequest).subscribe(res=>{
      this.pageResponse=res;
     this.items=this.pageResponse.items;
    })
  }
  loadData(){
    this.pagedRequest.id=0;
    this.service.articleService.getPageAsync(this.pagedRequest).subscribe(res=>{
      this.pageResponse=res;
     this.items=this.pageResponse.items;
    })
  }
  onselect(event:any){

  }
  naviagteToDetails(id:any){
    this.router.navigate(['/kafaat/article-details', id]);
  }
  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;



    return Math.ceil(totalCount / pageSize);
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:16,name:''};
    this.ngOnInit()
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:16,name:''};
    this.loadData()
  }
}
