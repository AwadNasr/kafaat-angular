import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { CategoryBooksService } from '../../services/category-books.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddBookLibraryComponent } from '../add-book-library/add-book-library.component';
import { EditBookLibraryComponent } from '../edit-book-library/edit-book-library.component';

@Component({
  selector: 'app-library-category-books-list',
  templateUrl: './library-category-books-list.component.html',
  styleUrls: ['./library-category-books-list.component.css']
})
export class LibraryCategoryBooksListComponent {
  id:any
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(private route: ActivatedRoute,private service:MainDashoardService
    ,private CategoryBooksService:CategoryBooksService
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.pagedRequest.id=this.id;
      this.getPage();
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
      this.CategoryBooksService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;
        }
      });
    }
    windowWidth: number = 0;
    deleteItem(id:number){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:{
          id:element.id,
          name:element.title,
          title:'حذف الكتاب',
          label:'اسم الكتاب',
          submit:()=>{
            this.CategoryBooksService.delete(element.id).pipe(
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
    addItem(): void {
      const dialogRef = this.service.dialog.open(AddBookLibraryComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        height:'85vh',
        data:this.id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    editItem(id:any){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(EditBookLibraryComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:element,
        height:'85vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
}
