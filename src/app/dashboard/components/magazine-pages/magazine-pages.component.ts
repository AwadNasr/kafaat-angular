import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { EditMagazineComponent } from '../edit-magazine/edit-magazine.component';
import { Subscription, catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { ActivatedRoute } from '@angular/router';
import { EditMagazinePageComponent } from '../edit-magazine-page/edit-magazine-page.component';

@Component({
  selector: 'app-magazine-pages',
  templateUrl: './magazine-pages.component.html',
  styleUrls: ['./magazine-pages.component.css']
})
export class MagazinePagesComponent  implements OnInit ,AfterViewInit,OnDestroy {
  targetId:any;
  private routeSubscription: Subscription = new Subscription();
  itemImg:string = "/assets/images/default.svg";
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  // pagedRequest:PagedRequest = {pageNumber:1,pageSize:12,name:''};
  pagedRequest:PagedRequest = { pageNumber: 1, pageSize: 12, name: "", id: 0, type: 0 };
  constructor(public service:MainDashoardService,private activatedRoute:ActivatedRoute) {
  }
  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe(param=>{
      this.targetId = Number(param.get("id"));
      this.pagedRequest.id = this.targetId;
      this.getPage();
    });
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
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
    this.service.magazinePageService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }

  editItem(id:any){
    const dialogRef = this.service.dialog.open(EditMagazinePageComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{id:id}
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
        name:element.pageNumber,
        title:'حذف صفحة من مجلة',
        label:'رقم الصفحة',
        submit:()=>{
          this.service.magazinePageService.delete(element.id).pipe(
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
}



