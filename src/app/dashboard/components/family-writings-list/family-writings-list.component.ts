import { Component } from '@angular/core';
import { FamilyWritingsService } from '../../services/family-writings.service';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { AddFamilyWritingsComponent } from '../add-family-writings/add-family-writings.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-family-writings-list',
  templateUrl: './family-writings-list.component.html',
  styleUrls: ['./family-writings-list.component.css']
})
export class FamilyWritingsListComponent {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(public service:MainDashoardService,private FamilyWritingsService:FamilyWritingsService,private router: Router) {
  }
  ngOnInit(): void {
    this.getPage();
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
    this.FamilyWritingsService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }

  addItem(): void {
    const dialogRef = this.service.dialog.open(AddFamilyWritingsComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(AddFamilyWritingsComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
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
        name:element.name,
        title:'حذف مؤلف',
        label:'اسم المؤلف',
        submit:()=>{
          this.FamilyWritingsService.delete(element.id).pipe(
            catchError((error) => {
              console.error(error);
              this.service.toastService.error('افحص السيرفر');
              return throwError(error);
            })
          ).subscribe((response) => {
            if(response.statusCode=="200"){
              this.service.toastService.success(response.message)
              this.pagedRequest.name='';
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
    dialogRef.afterClosed().subscribe(result => {
      this.pagedRequest.name='';
      this.getPage();
    });
  }
  openField(id:any){
    this.router.navigate(['/admin/family-writing-details', id]);
  }
}
