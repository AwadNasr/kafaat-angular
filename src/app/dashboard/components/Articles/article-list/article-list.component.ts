import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { AddArticleComponent } from '../add-article/add-article.component';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';
import { catchError, throwError } from 'rxjs';
import { ArticleDetailsComponent } from '../article-details/article-details.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent {
  windowWidth: number = 0;
  selectedActivityTypeId: number | string;
  activityTypes:any[];
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  activityTypeValue:string='';
  constructor(public service:MainDashoardService,private router: Router) {
  }
  ngOnInit(): void {
  this.pagedRequest.id=0;
    this.getPage();
    this.loadPrograms();
  }

  loadPrograms(){
    this.service.programsService.getAll().subscribe(response=>{
      this.activityTypes=response.data;

      // this.activityTypesCopy = this.activityTypes;
    })
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
  getPage(){
    this.service.articleService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }
  changeSelect(event:any){
    this.pagedRequest.id = +this.selectedActivityTypeId;
   /// this.pagedRequest.id=event.value;
    this.pagedRequest.pageNumber=1;
    this.getPage();
  }
  filterActivityTypes(){
    // this.activityTypes = this.activityTypesCopy;
    this.activityTypes = this.activityTypes.filter(value => value.title.includes(this.activityTypeValue));
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddArticleComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  deleteItem(id:number){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.title,
        title:'حذف المقال',
        label:'اسم المقال',
        submit:()=>{
          this.service.articleService.delete(element.id).pipe(
            catchError((error) => {
              console.error(error);
              this.service.toastService.error('افحص السيرفر');
              return throwError(error);
            })
          ).subscribe((response) => {
            if(response.statusCode=="200"){
              this.service.toastService.success(response.message)
              this.getPage();
            }else{
              this.service.toastService.error(response.message);
            }
          });
        }
        ,
        fun:()=>{
           this.getPage();
        }
      },
    });
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(AddArticleComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  openArticle(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(ArticleDetailsComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
}
