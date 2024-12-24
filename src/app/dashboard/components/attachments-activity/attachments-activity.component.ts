import { AfterViewInit, Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddCountryComponent } from '../add-country/add-country.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { EditCountryComponent } from '../edit-country/edit-country.component';
import { AddAttachmentActivityComponent } from '../add-attachment-activity/add-attachment-activity.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attachments-activity',
  templateUrl: './attachments-activity.component.html',
  styleUrls: ['./attachments-activity.component.css']
})
export class AttachmentsActivityComponent implements OnInit ,AfterViewInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:10,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:'',type:0};
  id:number
  constructor(public service:MainDashoardService,private route:ActivatedRoute) {
    route.params.subscribe(params=>{
      this.id=params['id']
      this.pagedRequest={pageNumber:1,pageSize:5,name:'',id:this.id,type:0};
    })
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
    this.service.attachmentsActivity.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
        console.log(res)
          this.pageResponse = res;
      }
    });
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddAttachmentActivityComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{activityId:this.id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editItem(id:any){
    const element=this.pageResponse.items.find(x=>x.id==id)
    const dialogRef = this.service.dialog.open(AddAttachmentActivityComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{...element,activityId:id}
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
        title:'حذف المرفق ',
        label:'اسم المرفق',
        submit:()=>{
          this.service.attachmentsActivity.delete(element.id).pipe(
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
  back(){
    this.service.router.navigateByUrl("/admin/details-activity/"+this.id);
  }
}



