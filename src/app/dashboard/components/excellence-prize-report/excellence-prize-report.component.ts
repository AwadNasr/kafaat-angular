import { Component } from '@angular/core';
import { ExcellencePrizeReportService } from '../../services/excellence-prize-report.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { catchError, throwError } from 'rxjs';
import { AddVolunteerReportComponent } from '../add-volunteer-report/add-volunteer-report.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddExcellencePrizeReportComponent } from '../add-excellence-prize-report/add-excellence-prize-report.component';

@Component({
  selector: 'app-excellence-prize-report',
  templateUrl: './excellence-prize-report.component.html',
  styleUrls: ['./excellence-prize-report.component.css']
})
export class ExcellencePrizeReportComponent {
  constructor(public ExcellencePrizeReportService:ExcellencePrizeReportService,private router: Router,
    public service:MainDashoardService,private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  windowWidth: number = 0;
  id:any
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
    this.ExcellencePrizeReportService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    })
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddExcellencePrizeReportComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'95vh',
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
        name:element.name,
        title:' حذف التقرير',
        label:'اسم التقرير',
        submit:()=>{
          this.ExcellencePrizeReportService.delete(element.id).pipe(
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
    const dialogRef = this.service.dialog.open(AddExcellencePrizeReportComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
}
