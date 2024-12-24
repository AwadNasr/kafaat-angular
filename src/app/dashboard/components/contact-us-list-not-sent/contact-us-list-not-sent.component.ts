import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ContactUsAddOrUpdateResponsePopUpComponent } from '../contact-us-add-or-update-response-pop-up/contact-us-add-or-update-response-pop-up.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { catchError, throwError } from 'rxjs';
import { ConfirmPopUpComponent } from '../confirm-pop-up/confirm-pop-up.component';

@Component({
  selector: 'app-contact-us-list-not-sent',
  templateUrl: './contact-us-list-not-sent.component.html',
  styleUrls: ['./contact-us-list-not-sent.component.css']
})
export class ContactUsListNotSentComponent implements OnInit ,AfterViewInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(public service:MainDashoardService,private kafaatMainService:KafaatMainService) {
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
    this.kafaatMainService.contactUsService.getPageNotSent(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }
  updateResponse(id:any): void {
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(ContactUsAddOrUpdateResponsePopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:id,
        message:element.message,
        label:"تعديل الرد",
        responseMessage:element.responseMessage,
        is_responseMessage_control_Disabled:false
      }
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
        name:element.message,
        title:'حذف رسالة زائر',
        label:'الرسالة',
        submit:()=>{
          this.kafaatMainService.contactUsService.delete(element.id).pipe(
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
  sendResponeseToTheVisitor(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(ConfirmPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.name,
        title:' تأكيد إرسال الرسالة إلى الزائر',
        confirmationMessage:`هل حقا تريد ارسال الرسالة إلى الزائر ${element.userName} ؟`,
        submit:()=>{
          this.kafaatMainService.contactUsService.sendResponse(id).pipe(
            catchError((error) => {
              console.error(error);
              this.service.toastService.error('افحص السيرفر');
              return throwError(error);
            })
          ).subscribe((response) => {
            if(response.statusCode == 200){
              this.service.toastService.success(response.message)
            }else{
              this.service.toastService.error(response.message);
            }
            this.getPage();
          });
        }
        ,
        fun:()=>{
           this.getPage();
        }
      },
    });
  }
}





