import { AddExcellencePrizeComponent } from './../add-excellence-prize/add-excellence-prize.component';
import { Component } from '@angular/core';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { Router } from '@angular/router';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-excellence-prize-list',
  templateUrl: './excellence-prize-list.component.html',
  styleUrls: ['./excellence-prize-list.component.css']
})
export class ExcellencePrizeListComponent {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(public service:MainDashoardService,private router: Router,private excellencePrizeService:ExcellencePrizeService) {
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
      this.excellencePrizeService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;
        }
      });
    }
    deleteItem(id:number){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:{
          id:element.id,
          name:element.name,
          title:'حذف جائزة التفوق',
          label:'اسم جائزة التفوق',
          submit:()=>{
            this.excellencePrizeService.delete(element.id).pipe(
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
      const dialogRef = this.service.dialog.open(AddExcellencePrizeComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        height:'95vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    editItem(id:any){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(AddExcellencePrizeComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:element,
        height:'95vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    openPrize(id:any){
      this.router.navigate(['/admin/excellence-prize-details', id]);
    }
}
