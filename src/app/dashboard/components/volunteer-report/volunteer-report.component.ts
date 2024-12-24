import { Component, OnInit } from '@angular/core';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { VolunteerReportService } from '../../services/volunteer-report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddVolunteerReportComponent } from '../add-volunteer-report/add-volunteer-report.component';

@Component({
  selector: 'app-volunteer-report',
  templateUrl: './volunteer-report.component.html',
  styleUrls: ['./volunteer-report.component.css']
})
export class VolunteerReportComponent implements OnInit {
  id:any
  constructor(public volunteerReportService:VolunteerReportService,private router: Router,public service:MainDashoardService,
    private route: ActivatedRoute
  ) {
      this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
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
    this.volunteerReportService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddVolunteerReportComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'60vh',
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
        title:' حذف التقرير',
        label:' عنوان التقرير',
        submit:()=>{
          this.volunteerReportService.delete(element.id).pipe(
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
    const dialogRef = this.service.dialog.open(AddVolunteerReportComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'60vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
}
