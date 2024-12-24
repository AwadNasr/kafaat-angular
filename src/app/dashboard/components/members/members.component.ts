import { AfterViewInit, Component, OnInit } from '@angular/core';
import { changeUserRoleModel, userEmailModel } from '../../core/models/member-models';
import { catchError, throwError } from 'rxjs';
import { ConfirmPopUpComponent } from '../confirm-pop-up/confirm-pop-up.component';
import { ExcelItem,PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { UserRoles } from 'src/app/kafaat/core/user-roles';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';
import { SendEmailPopUpComponent } from '../send-email-pop-up/send-email-pop-up.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { ChangeUserCategoryPopUpComponent } from '../change-user-category-pop-up/change-user-category-pop-up.component';
import { MatDialog } from '@angular/material/dialog';
import { EditMemberComponent } from '../edit-member/edit-member.component';
import { AdvancedSearchComponent } from '../advanced-search/advanced-search.component';
import { ExcelServicesService } from '../../services/excel-services.service';
import { AddUserToPrizeComponent } from '../add-user-to-prize/add-user-to-prize.component';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})

export class MembersComponent implements OnInit ,AfterViewInit {


  windowWidth: number = 0;
  pageResponse1:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pageResponse:any={totalCount:0,items:[]};
   pagedRequest1:PagedRequest = {pageNumber:1,pageSize:5,name:'',firstName:'',lastName:'',middleName:'',phoneNumber:'',identityNumber:'',countryId:0,districtId:0,familyBranchId:0,qualificationId:0,specializationId:0,birthDateInAD:Date.now};
  pagedRequest:any = {name:'',firstName:'',lastName:'',middleName:'',phoneNumber:'',identityNumber:'',countryId:0,districtId:0,familyBranchId:0,qualificationId:0,specializationId:0,birthDateInAD:Date.now};
  responseToExcel: { items: ExcelItem[] }={items:[]}
  constructor(public service:MainDashoardService,public dialog: MatDialog, private excelService:ExcelServicesService) {
  }
  ngOnInit(): void {
    this.getPage1();
    this.getPage();

  }
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }
  exitSearch(){
    this.pagedRequest1= {pageNumber:1,pageSize:5,name:'',firstName:'',lastName:'',middleName:'',phoneNumber:'',identityNumber:'',countryId:0,districtId:0,familyBranchId:0,qualificationId:0,specializationId:0,birthDateInAD:Date.now};
    this.pagedRequest={pageNumber:1,pageSize:5,name:'',firstName:'',lastName:'',middleName:'',phoneNumber:'',identityNumber:'',countryId:0,districtId:0,familyBranchId:0,qualificationId:0,specializationId:0,birthDateInAD:Date.now};
    this.getPage();
    this.getPage1();
  }
  onNameChange(value: string) {
    console.log(value);

    this.pagedRequest.name = value;
    this.getPage();
  }
  openSearch(){
    const dialogRef = this.service.dialog.open(AdvancedSearchComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'100%',
    });
    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Search parameters:', result);
        this.pagedRequest.firstName=result.firstName;
        this.pagedRequest.lastName=result.lastName;
        this.pagedRequest.middleName=result.middleName;
        this.pagedRequest.phoneNumber=result.phoneNumber;
        this.pagedRequest.identityNumber=result.identityNumber;
        this.pagedRequest.countryId=result.countryId;
        this.pagedRequest.districtId=result.districtId;
        this.pagedRequest.familyBranchId=result.familyBranchId;
        this.pagedRequest.qualificationId=result.qualificationId;
        this.pagedRequest.specializationId=result.specializationId;
        this.pagedRequest.birthDateInAD=result.birthDateInAD;
        //
        this.pagedRequest1.firstName=result.firstName;
        this.pagedRequest1.lastName=result.lastName;
        this.pagedRequest1.middleName=result.middleName;
        this.pagedRequest1.phoneNumber=result.phoneNumber;
        this.pagedRequest1.identityNumber=result.identityNumber;
        this.pagedRequest1.countryId=result.countryId;
        this.pagedRequest1.districtId=result.districtId;
        this.pagedRequest1.familyBranchId=result.familyBranchId;
        this.pagedRequest1.qualificationId=result.qualificationId;
        this.pagedRequest1.specializationId=result.specializationId;
        this.pagedRequest1.birthDateInAD=result.birthDateInAD;
        this.getPage1();
        this.getPage()
      }
    });
  }


  editMember(email:any){
    const dialogRef = this.service.dialog.open(EditMemberComponent, {
      data: {email},
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'100%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage1();
      this.getPage()
    });
  }

  getPageByName(){
    this.getPage1();
  }
  //p:any= 1;
  changePageSize(){
    this.pagedRequest.pageNumber = 1;
    this.getPage1();
  }
  changePageNumber(event:any){
    this.pagedRequest1.pageNumber = event;
    this.getPage1();
  }
  getPage1(){
    this.service.membersService.getMembersPage(this.pagedRequest1).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse1 = res;
      }
    });
  }
  getPage(){
    this.responseToExcel.items = []
    this.service.membersService.getMembersWhithoutPaging(this.pagedRequest).subscribe({
      next:(res:any)=>{
          this.pageResponse = res;
          this.responseToExcel.items = res.items.map(this.transformToExcelItem);
      }
    });
  }

  restoreUserToJoinRequestState(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    let model:userEmailModel = {email:element.email};
    const dialogRef = this.service.dialog.open(ConfirmPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.name,
        title:' تأكيد الإعادة إلى حالة طلب الإنضمام',
        confirmationMessage:`هل حقاً تريد إعادة المستخدم ${element.name} إلى حالة طلب الإنضمام فى نظام كفاءات ؟`,
        submit:()=>{
          this.service.membersService.restoreUserToJoinRequestState(model).pipe(
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
            this.getPage1();
            this.getPage()
          });
        }
        ,
        fun:()=>{
           this.getPage1();
           this.getPage()
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
            this.getPage1();
            this.getPage()
          });
        }
        ,
        fun:()=>{
           this.getPage1();
           this.getPage()
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
  addUserToPrize(id:any){
    const dialogRef = this.service.dialog.open(AddUserToPrizeComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:
        id
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
              this.getPage1();
              this.getPage()
            }else{
              this.service.toastService.error(response.message);
            }
          });
        }
        ,
        fun:()=>{
           this.getPage1();
           this.getPage()
        }
      },
    });
  }
  transformToExcelItem(item: any): ExcelItem {
    const formatDate = (date: any): string => {
      if (!date) return '';
      const d = new Date(date);
      return d.toISOString().split('T')[0];
  };
  const translateGender = (gender: any): string => {
    if (gender === 'm') return 'ذكر';
    if (gender === 'f') return 'أنثى';
    return '';
};
const translateMaritalStatus = (status: any): string => {
  if (status === 's') return 'اعزب';
  if (status === 'm') return 'متزوج';

  return '';
};
    return {
      الاسم_رباعي: item.name || '',
      فرع_العائلة: item.familyBranchName || '',
      رقم_الهوية: item.identityNumber || '',
      رقم_الجوال: item.phoneNumber || '',
      المؤهل: item.qualificationName || '',
      القسم: item.departmentName || '',
      التخصص: item.specializationName || '',
      النوع: translateGender(item.gender),
      التاريخ_الميلادي: formatDate(item.birthDateInAD),
      التاريخ_الهجري: formatDate(item.birthDateInHijri),
      البلد: item.countryName || '',
      المدينة: item.cityName || '',
        الحي: item.districtName || '',
        الوظيفة: item.workType || '',
        الحالة_الاجتماعية: translateMaritalStatus(item.maritalStatus),
        الكنية: item.nickName || '',
        الخبرات: item.experience || '',
        وجه_التميز: item.distinguishedType || '',
        الهوايات: item.hoppies || '',
        رابط_تويتر: item.twitterLink || '',
        رابط_فيسبوك: item.facebookLink || '',
        السيرة_الذاتية: item.cvPath || '',
        البريد_الالكتروني: item.email || '',
    };
}
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.responseToExcel.items, 'الاعضاء');
  }
}






