import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ExcelItem1 } from 'src/app/kafaat/core/models/paged-response';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ConfirmPopUpComponent } from '../confirm-pop-up/confirm-pop-up.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';

@Component({
  selector: 'app-all-members',
  templateUrl: './all-members.component.html',
  styleUrls: ['./all-members.component.css']
})
export class AllMembersComponent {
  pageResponse:any={totalCount:0,items:[]};
  pagedRequest:any = {name:'',id:0};
  responseToExcel: { items: ExcelItem1[] }={items:[]}
id:number=0
memberOdDistinguished:Boolean;
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,){
    this.route.params.subscribe(params=>{
      this.id=params['id']
      if(this.id==1){
        this.memberOdDistinguished=true
      }else if(this.id==2){
        this.memberOdDistinguished=false
      }
    })

  }
  ngOnInit(): void {
    this.getPage();
  }


  getPageByName(){
    this.getPage();
  }



  getPage(){
    if(this.memberOdDistinguished){
      this.service.activityParticipantsService.getPageWithoutPagingAll(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
            this.responseToExcel.items = res.items.map(this.transformToExcelItem);
        }
      });
    }else{
      this.service.activityParticipantsService.getPageWithoutPagingAllDistinguised(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
            this.responseToExcel.items = res.items.map(this.transformToExcelItem);
        }
      });
    }
    }
  transformToExcelItem(item: any): ExcelItem1
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



p:any= 1;
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.responseToExcel.items, 'الاعضاء');
  }
}

