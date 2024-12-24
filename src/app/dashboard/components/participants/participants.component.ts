import { AfterViewInit, Component, OnInit } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { ExcelItem1, PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { UserRoles } from 'src/app/kafaat/core/user-roles';
import { userEmailModel, changeUserRoleModel } from '../../core/models/member-models';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ConfirmPopUpComponent } from '../confirm-pop-up/confirm-pop-up.component';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadingClubParticipantService } from './../../services/reading-club-participant.service';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { ExcelServicesService } from '../../services/excel-services.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit ,AfterViewInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  pageResponse1:any={totalCount:0,items:[]};
  pagedRequest1:any = {name:''};
  responseToExcel: { items: ExcelItem1[] }={items:[]}
  id:number
  clubOrActivity:boolean =false;
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,){
    if(this.router.getCurrentNavigation().previousNavigation.initialUrl.root.
    children['primary'].parent.children['primary'].segments[1].path == 'club-details'){
      this.clubOrActivity = true;
    }else{
      this.clubOrActivity = false;
    }
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
    this.pagedRequest1={name:'',id:this.id};
  }
  ngOnInit(): void {
    this.getPage1();
    this.getPage();
  }
  onNameChange(value: string) {
    console.log(value);

    this.pagedRequest1.name = value;
    this.getPage();
  }
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  getPageByName(){
    this.pagedRequest.pageNumber=1
    this.getPage1();
  }

  changePageSize(){
    this.pagedRequest1.pageNumber = 1;
    this.getPage1();
  }
  changePageNumber(event:any){
    this.pagedRequest.pageNumber = event;
    this.getPage1();
  }
  getPage(){
    if(this.clubOrActivity){
      this.service.readingClubParticipantService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;
        }
      });
    }else{
      this.responseToExcel.items = []
    this.service.activityParticipantsService.getPageWithoutPaging(this.pagedRequest1).subscribe({
      next:(res:any)=>{
          this.pageResponse1 = res;
          this.responseToExcel.items = res.items.map(this.transformToExcelItem);
      }
    });
  }
  }
  getPage1(){
    this.service.activityParticipantsService.getPageParticipants(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
          this.responseToExcel.items = res.items.map(this.transformToExcelItem);
      }
    });
  }
  transformToExcelItem(item: any): any
   {
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
      الاسم_رباعي: item.userDisplayName || '',
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
        // nickName: item.nickName || '',
        // experience: item.experience || '',
        // distinguishedType: item.distinguishedType || '',
        // hoppies: item.hoppies || '',
        // twitterLink: item.twitterLink || '',
        // facebookLink: item.facebookLink || '',
        // cvPath: item.cvPath || '',
        // email: item.email || '',
    };
}
  addDis(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(ConfirmPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.userDisplayName,
        title:' جعل المستخدم متميزا لهذا النشاط',
        confirmationMessage:`هل حقاً تريد جعل المستخدم ${element.userDisplayName}  متميزا في هذا النشاط ؟`,
        submit:()=>{
          this.service.activityParticipantsService.addDis({UserId:element.userId,ActivityId:element.id}).pipe(
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


  removeDis(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(ConfirmPopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.userDisplayName,
        title:'ازالة المستخدم من المتيميزون',
        confirmationMessage:`هل حقاً تريد ازالة المستخدم ${element.userDisplayName} من المتميزون؟`,
        submit:()=>{
          this.service.activityParticipantsService.removeDis({UserId:element.userId,ActivityId:element.id}).pipe(
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
        // email:element.email,
        id
      }
    })
  }
  back(){
    if(this.clubOrActivity){
      this.service.router.navigateByUrl("/admin/club-details/"+this.id);
    }else{
    this.service.router.navigateByUrl("/admin/details-activity/"+this.id);
  }

  }
  deleteAccount(email:string,name:any){
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:email,
        name:name,
        title:'حذف مستخدم من المنشط',
        label:' اسم العضو',
        submit:()=>{
          this.servicee.activityParticipantsService.exit({ActivityId:this.id,ParticipantId:email}).pipe(
            catchError((error) => {
              console.error(error);
              this.service.toastService.error('افحص السيرفر');
              return throwError(error);
            })
          ).subscribe((response) => {
            if(response.statusCode=="200"){
              this.service.toastService.success("تم ازالة العضو من المنشط");
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
  p:any= 1;
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.responseToExcel.items, 'الاعضاء');
  }

}

