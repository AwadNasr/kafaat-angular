import { Component } from '@angular/core';
import { StrategicObjectivesService } from '../../services/strategic-objectives.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddVolunteerComponent } from '../add-volunteer/add-volunteer.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddStrategicObjectivesComponent } from '../add-strategic-objectives/add-strategic-objectives.component';

@Component({
  selector: 'app-strategic-objectives-list',
  templateUrl: './strategic-objectives-list.component.html',
  styleUrls: ['./strategic-objectives-list.component.css']
})
export class StrategicObjectivesListComponent {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(public service:MainDashoardService,private router: Router
    ,private StrategicObjectivesService:StrategicObjectivesService) {
  }
  ngOnInit(): void {
    this.pagedRequest.id=0;
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
      this.StrategicObjectivesService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;
        }
      });
    }
    changeSelect(event:any){
      this.pagedRequest.id=event.value;
      this.pagedRequest.pageNumber=1;
      this.getPage();
    }
    deleteItem(id:number){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:{
          id:element.id,
          name:element.title,
          title:'حذف  الهدف',
          label:'اسم الهدف',
          submit:()=>{
            this.StrategicObjectivesService.delete(element.id).pipe(
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
      const dialogRef = this.service.dialog.open(AddStrategicObjectivesComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        height:'45vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    editItem(id:any){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(AddStrategicObjectivesComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:element,
        height:'45vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
}
