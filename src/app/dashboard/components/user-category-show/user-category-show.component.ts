import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { UserCategoryAddComponent } from '../user-category-add/user-category-add.component';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';

@Component({
  selector: 'app-user-category-show',
  templateUrl: './user-category-show.component.html',
  styleUrls: ['./user-category-show.component.css']
})
export class UserCategoryShowComponent implements OnInit,AfterViewInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};

  constructor(public service:MainDashoardService) {}
  ngOnInit(): void {
    this.getPage();
  }

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  getPageByName(){
    console.log("sskskks");
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
    this.service.userCategoryService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.service.dialog.open(UserCategoryAddComponent, {
      width:'50%',
      data:{fun:()=>{
        this.getPage();
      }}
    });
   
  }
  @ViewChild(MatPaginator) paginator: MatPaginator ;
  
 
  

  editItem(id:number){
    const category=  this.pageResponse.items.find(value=>value.id==id);
    const dialogRef = this.service.dialog.open(UserCategoryAddComponent, {
      width:'50%',
      data:{...category,fun:()=>{
         this.getPage()
      }}
    });
  }
  
  deleteItem(id:number){
    const category=  this.pageResponse.items.find(value=>value.id==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:'50%',
      data:{
        id:category.id,
        name:category.name,
        title:'حذف تصنيف',
        label:'اسم التصنيف',
        submit:()=>{
          this.service.userCategoryService.delete(category.id).pipe(
            catchError((error) => {
              console.error(error);
              this.service.toastService.error('افحص السرفر');
              return throwError(error);
            })
          ).subscribe((response) => {
            if(response.statusCode=="200"){
              this.service.toastService.success(response.message)
               this.getPage()
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
}
