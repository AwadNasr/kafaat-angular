import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ReadingClubTripBooksService } from '../../services/reading-club-trip-books.service';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddBookToClubTripComponent } from '../add-book-to-club-trip/add-book-to-club-trip.component';

@Component({
  selector: 'app-reading-club-trip-books',
  templateUrl: './reading-club-trip-books.component.html',
  styleUrls: ['./reading-club-trip-books.component.css']
})
export class ReadingClubTripBooksComponent {
  id:any;
  pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,private ReadingClubTripBooksService:ReadingClubTripBooksService
  ){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })

  }
  ngOnInit(): void {
    this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
    this.getPage();
  }
  windowWidth: number = 0;
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
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
      this.ReadingClubTripBooksService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
        }
      });
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddBookToClubTripComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'50vh',
      data:this.id
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
        title:'حذف الكتاب',
        label:'اسم الكتاب',
        submit:()=>{
          this.ReadingClubTripBooksService.delete(element.id).pipe(
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
}
