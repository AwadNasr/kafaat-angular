import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelItem1 } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { ExcelServicesService } from '../../services/excel-services.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';
import { VolunteerFieldParticipantsService } from '../../services/volunteer-field-participants.service';
@Component({
  selector: 'app-volunteer-field-supervisor',
  templateUrl: './volunteer-field-supervisor.component.html',
  styleUrls: ['./volunteer-field-supervisor.component.css']
})
export class VolunteerFieldSupervisorComponent {
  pageResponse:any={totalCount:0,items:[]};;
  pagedRequest:any = {name:''};
  id:number
  allQualifications:any[];
  qualificationId:any
  navList:any[];
  responseToExcel: { items: ExcelItem1[] }={items:[]}
  constructor(public service:MainDashoardService,private route:ActivatedRoute,
    private router: Router,private VolunteerFieldParticipantsService:VolunteerFieldParticipantsService,private excelService:ExcelServicesService){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    this.loadQualifications();


  }
  ngOnInit(): void {
    this.pagedRequest= {name:'',id:this.id,qualificationId:0};
    this.getPage();
  }
  getPageByName(){
    this.getPage(this.qualificationId);
  }

  changePageSize(){
    this.pagedRequest.pageNumber = 1;
    this.getPage(this.qualificationId);
  }
  changePageNumber(event:any){
    this.pagedRequest.pageNumber = event;
    this.getPage(this.qualificationId);
  }
  getPage(id:number = 10007){
    this.pagedRequest.qualificationId=id
      this.VolunteerFieldParticipantsService.getSupervisorPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
            this.responseToExcel.items = res.items.map(this.transformToExcelItem);
        }
      });
  }

  loadQualifications(){
    this.service.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.allQualifications = res.data;
          this.navList = [];
          for (let i = 0; i < this.allQualifications.length; i++) {

            if (this.allQualifications[i].name !== "إبتدائي" && this.allQualifications[i].name !== "متوسط") {
              this.navList.push({
                id: this.allQualifications[i].id,
                label: this.allQualifications[i].name,
                isSelected: i === 0,
              });
            }
          }
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
    this.qualificationId=id
     this.getPage(id);
  }
  p:any= 1;
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.responseToExcel.items, 'المشرفون');
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
       فرع_العائلة: item.familyBranch || '',
       رقم_الهوية: item.identityNumber || '',
       رقم_الجوال: item.phoneNumber || '',
       المؤهل: item.qualification || '',
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
windowWidth: number = 0;
viewUserProfile(id:any){
  const element=  this.pageResponse.items.find((value:any)=>value.id==id);
  const dialogRef = this.service.dialog.open(UserProfilePopUpComponent, {
    width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
    data:{
      id
    }
  })
}
}
