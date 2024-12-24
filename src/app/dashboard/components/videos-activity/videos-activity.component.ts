import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddAttachmentActivityComponent } from '../add-attachment-activity/add-attachment-activity.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddVideoActivityComponent } from '../add-video-activity/add-video-activity.component';

@Component({
  selector: 'app-videos-activity',
  templateUrl: './videos-activity.component.html',
  styleUrls: ['./videos-activity.component.css']
})
export class VideosActivityComponent implements OnInit ,AfterViewInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:10,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:'',type:2};
  id:number
  constructor(public service:MainDashoardService,private route:ActivatedRoute) {
    route.params.subscribe(params=>{
      this.id=params['id']
      this.pagedRequest={pageNumber:1,pageSize:5,name:'',id:this.id,type:2};
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
          this.pageResponse = res;
      }
    });
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddVideoActivityComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{activityId:this.id},
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editItem(id:any){
    const element=this.pageResponse.items.find(x=>x.id==id)
    const dialogRef = this.service.dialog.open(AddVideoActivityComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{...element,activityId:id},
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
        name:element.title,
        title:'حذف الفديو ',
        label:'url الفديو',
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



