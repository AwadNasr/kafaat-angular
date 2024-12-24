import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ReadingClubDetailsComponent } from '../../ReadingClub/reading-club-details/reading-club-details.component';
import { DialogDeleteComponent } from '../../dialog-delete/dialog-delete.component';
import { AddReadingClubReportComponent } from '../add-reading-club-report/add-reading-club-report.component';

@Component({
  selector: 'app-reading-club-report-list',
  templateUrl: './reading-club-report-list.component.html',
  styleUrls: ['./reading-club-report-list.component.css']
})
export class ReadingClubReportListComponent {
  windowWidth: number = 0;
  activityTypes:any[];
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  activityTypeValue:string='';
  constructor(public service:MainDashoardService,private router: Router) {
  }
  ngOnInit(): void {
  this.pagedRequest.id=0;
    this.getPage();
    // this.loadPrograms();
  }

  // loadPrograms(){
  //   this.service.programsService.getAll().subscribe(response=>{
  //     this.activityTypes=response.data;
  //     // this.activityTypesCopy = this.activityTypes;
  //   })
  // }
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
    this.service.ReadingClubReportService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
          console.log(this.pageResponse);

      }
    });
  }
  changeSelect(event:any){
    this.pagedRequest.id=event.value;
    this.pagedRequest.pageNumber=1;
    this.getPage();
  }
  filterActivityTypes(){
    // this.activityTypes = this.activityTypesCopy;
    this.activityTypes = this.activityTypes.filter(value => value.title.includes(this.activityTypeValue));
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddReadingClubReportComponent, {
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
        name:element.year,
        title:'حذف التقرير',
        label:'سنة التقرير',
        submit:()=>{
          this.service.ReadingClubReportService.delete(element.id).pipe(
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
    const dialogRef = this.service.dialog.open(AddReadingClubReportComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  openClub(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(ReadingClubDetailsComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
}
