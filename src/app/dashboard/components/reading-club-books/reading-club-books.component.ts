import { AddBookComponent } from './../add-book/add-book.component';
import { ReadingClubBookServiceService } from './../../services/reading-club-book-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-reading-club-books',
  templateUrl: './reading-club-books.component.html',
  styleUrls: ['./reading-club-books.component.css']
})
export class ReadingClubBooksComponent implements OnInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  id:number;
  constructor(public service:MainDashoardService,private route:ActivatedRoute,private router: Router,private readingClubBookService:ReadingClubBookServiceService){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    console.log(this.id);

    this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
  }
  ngOnInit(): void {
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
    this.readingClubBookService.getPage(this.pagedRequest).subscribe({
      next:(res:any)=>{
        this.pageResponse=res;
      }
    }
    )
  }

  deleteItem(id:number){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.title,
        title:'حذف كتاب',
        label:'عنوان الكتاب',
        submit:()=>{
          this.readingClubBookService.delete(element.id).pipe(
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
    const dialogRef = this.service.dialog.open(AddBookComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'60vh',
      data:this.id,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editItem(item:any){
    //const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(EditBookComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:item,
      height:'60vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
}
