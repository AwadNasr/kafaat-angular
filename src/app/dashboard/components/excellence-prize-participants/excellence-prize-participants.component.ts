import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ExcellencePrizeParticipantsService } from '../../services/excellence-prize-participants.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { ExcelItem1, PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-excellence-prize-participants',
  templateUrl: './excellence-prize-participants.component.html',
  styleUrls: ['./excellence-prize-participants.component.css']
})
export class ExcellencePrizeParticipantsComponent {
  id:any
  // pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  // pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  currentYear: string;
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  windowWidth: number = 0;
  pageResponse:any={totalCount:0,items:[]};
  pagedRequest:any = {name:''};
  responseToExcel: { items: ExcelItem1[] }={items:[]}
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,private excellencePrizeParticipantsService:ExcellencePrizeParticipantsService){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    this.currentYear = this.getCurrentYear();
    this.loadQualifications();
  }
  getCurrentYear(): string {
    const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return `${currentYear}/${nextYear}`;
  }
  ngOnInit(): void {
    this.pagedRequest={name:'',id:this.id,qualificationId:0};
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
      this.excellencePrizeParticipantsService.getApprovedPageAsync(this.pagedRequest).subscribe({
        next:(res:any)=>{
          this.pageResponse = res;

          this.responseToExcel.items = res.items.map(this.transformToExcelItem);
        }
      });
  }
  p:any= 1;
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.responseToExcel.items, 'المشاركون');
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
  loadQualifications(){
    this.service.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.allQualifications = res.data;
          this.navList = [];
          for (let i = 0; i < this.allQualifications.length; i++) {

            if (this.allQualifications[i].name !== "إبتدائي") {
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
  deleteItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.participantId==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.participantId,
        name:element.userDisplayName,
        title:'حذف المشارك',
        label:'اسم المشارك',
        submit:()=>{
          const user={
            participantId:id,excellencePrizeId:this.id
          };
          console.log(user);

          this.excellencePrizeParticipantsService.deleteUser(user).pipe(
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

