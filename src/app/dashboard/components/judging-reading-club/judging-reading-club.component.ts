import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { ExcellencePrizeParticipantsService } from '../../services/excellence-prize-participants.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';
import { ReadingClubTripsParticipantsService } from '../../services/reading-club-trips-participants.service';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-judging-reading-club',
  templateUrl: './judging-reading-club.component.html',
  styleUrls: ['./judging-reading-club.component.css']
})
export class JudgingReadingClubComponent {
  id:any
  pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,private ReadingClubTripsParticipantsService:ReadingClubTripsParticipantsService
  ){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    this.loadQualifications();
  }
  ngOnInit(): void {
    this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
    this.getPage();
  }
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
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
      this.ReadingClubTripsParticipantsService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
        }
      });
  }
  loadQualifications() {
    this.service.qualificationService.getAll().subscribe({
      next: (res: ResponseVM) => {
        if (res.statusCode == 200) {
          this.allQualifications = res.data;
          this.navList = [];
          for (let i = 0; i < this.allQualifications.length; i++) {
            // Skip if the qualification name is "ابتدائي"
            if (this.allQualifications[i].name !== "إبتدائي") {
              this.navList.push({
                id: this.allQualifications[i].id,
                label: this.allQualifications[i].name,
                isSelected: i === 0,
              });
            }
          }
        } else {
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
  onApprovalChange(participantId: any, approvalStatus: string): void {
    const isApproved = approvalStatus === 'true';
if(isApproved==true)  {
this.approveUser(participantId);
}else{
this.disapproveUser(participantId);
}
  }
  approveUser(userId:string){
    this.ReadingClubTripsParticipantsService.approveHero({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  disapproveUser(userId:string){
    this.ReadingClubTripsParticipantsService.disapproveHero({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onBenefitsEnter(itemId: any, event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.editBenefits(itemId,inputValue);
  }
  editBenefits(userId:string,value:string){
    this.ReadingClubTripsParticipantsService.editBenefits({participantId:userId,readingClubTripId:this.id,value:value}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onBadgeEnter(itemId: any, event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.editBadge(itemId,inputValue);
  }
  editBadge(userId:string,value:string){
    this.ReadingClubTripsParticipantsService.editBadge({participantId:userId,excellencePrizeId:this.id,value:value}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onShareLinkEnter(itemId: any, event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.editShareLink(itemId,inputValue);
  }
  editShareLink(userId:string,value:string){
    this.ReadingClubTripsParticipantsService.editShareLink({participantId:userId,excellencePrizeId:this.id,value:value}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  deleteItem(id:number){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.participantId,
        name:element.userDisplayName,
        title:'حذف المشارك',
        label:'اسم المشارك',
        submit:()=>{
          this.ReadingClubTripsParticipantsService.delete(element.id).pipe(
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
  onQualificationChange(participantId: string, qualificationId: any): void {
    this.updateQualification(participantId, qualificationId);
  this.getPage(this.qualificationId);
  }

  updateQualification(participantId: string, qualificationId: string): void {
    this.ReadingClubTripsParticipantsService.editQualification({participantId:participantId,readingClubTripId:this.id,value:qualificationId}).subscribe(response => {
      if(response.statusCode=='200'){
        this.service.toastService.success(response.message);
        }else{
          this.service.toastService.error(response.message);
        }
    });
  }

}
