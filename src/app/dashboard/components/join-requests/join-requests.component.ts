import { AfterViewInit, Component, OnInit } from '@angular/core';
import { changeUserRoleModel, userEmailModel } from '../../core/models/member-models';
import { catchError, throwError } from 'rxjs';
import { ConfirmPopUpComponent } from '../confirm-pop-up/confirm-pop-up.component';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { UserRoles } from 'src/app/kafaat/core/user-roles';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';
import { SendEmailPopUpComponent } from '../send-email-pop-up/send-email-pop-up.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { ChangeUserCategoryPopUpComponent } from '../change-user-category-pop-up/change-user-category-pop-up.component';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.css']
})
export class JoinRequestsComponent implements OnInit ,AfterViewInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(public service:MainDashoardService) {
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
    this.service.membersService.getJoinRequestsPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }

  approveMembership(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    let model:userEmailModel = {email:element.email};
    const dialogRef = this.service.dialog.open(ConfirmPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.name,
        title:' تأكيد قبول طلب الإنضمام',
        confirmationMessage:`هل حقاً تريد قبول عضوية ${element.name} فى نظام كفاءات ؟`,
        submit:()=>{
          this.service.membersService.approveMembership(model).pipe(
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
  changeUserRoleship(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    let userRole = element.role;
    let model:changeUserRoleModel = {email:element.email,role:userRole==UserRoles.Admin?UserRoles.Member:UserRoles.Admin};
    const dialogRef = this.service.dialog.open(ConfirmPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.name,
        title:'تغيير وظيفة مستخدم داخل نظام كفاءات',
        confirmationMessage:`هل حقا تريد تغيير الدور الوظيفى للمستخدم  ${element.name} من ${userRole==UserRoles.Member?'عضو':'مشرف'}  إلى ${userRole==UserRoles.Admin?'عضو':'مشرف'} ؟`,
        submit:()=>{
          this.service.membersService.changeUserRole(model).pipe(
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
  viewUserProfile(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(UserProfilePopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:{
        email:element.email,
      }
    })
  }
  sendEmailToUser(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(SendEmailPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:{
        id:element.id,
        email:element.email,
      }
    })
  }
  changeUserCategory(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(ChangeUserCategoryPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:{
        id:element.id,
        email:element.email,
        userCategoryId:element.userCategoryId,
      }
    })
  }
  deleteAccount(email:string){
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:email,
        name:email,
        title:'حذف حساب مستخدم',
        label:'البريد الإليكترونى',
        submit:()=>{
          this.service.membersService.deleteAccount(email).pipe(
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
}





