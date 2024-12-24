import { AfterViewInit, Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddCountryComponent } from '../add-country/add-country.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { EditCountryComponent } from '../edit-country/edit-country.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit ,AfterViewInit {
  windowWidth: number = 0;
  activityTypes:any[];
  activityTypesCopy:any[];
  activityTypeValue:string='';
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
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
      this.activityTypesCopy = this.activityTypes;
    })
  }
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
    this.service.activityService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddCountryComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%')
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(EditCountryComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{id:id}
      //data:element
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
        title:'حذف نشاط',
        label:'اسم النشاط',
        submit:()=>{
          this.service.activityService.delete(element.id).pipe(
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

  openActivity(id:number){
    console.log(id)
    this.router.navigate(['/admin/details-activity', id]);
  }
  changeSelect(event:any){
    this.pagedRequest.id=event.value;
    this.pagedRequest.pageNumber=1;
    this.getPage();
  }
  filterActivityTypes(){
    this.activityTypes = this.activityTypesCopy;
    this.activityTypes = this.activityTypes.filter(value => value.title.includes(this.activityTypeValue));
  }
}



