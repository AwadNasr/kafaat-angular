import { Component } from '@angular/core';
import { VolunteerFieldParticipantsService } from '../../services/volunteer-field-participants.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-judging-volunteer',
  templateUrl: './judging-volunteer.component.html',
  styleUrls: ['./judging-volunteer.component.css']
})
export class JudgingVolunteerComponent {
  windowWidth: number = 0;
  id:any
  pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,private VolunteerFieldParticipantsService:VolunteerFieldParticipantsService
  ){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    //this.currentYear = this.getCurrentYear();
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
      this.VolunteerFieldParticipantsService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
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
  onRewardEnter(itemId: any, event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.editReward(itemId,inputValue);
  }
  editReward(userId:string,value:string){
    this.VolunteerFieldParticipantsService.editReward({participantId:userId,excellencePrizeId:this.id,value:value}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onApprovalChange(participantId: any, approvalStatus: string): void {
    const isApproved = approvalStatus === 'true';
    const participant = this.pageResponse.items.find((p:any) => p.participantId === participantId);
  if (participant) {
    participant.isApproved = isApproved;
    participant.isDisapproved = !isApproved;
    if (!isApproved) {
      participant.reward = "0";

    }
  }
if(isApproved==true)  {
this.approveUser(participantId);
}else{
this.disapproveUser(participantId);
}
  }
  approveUser(userId:string){
    this.VolunteerFieldParticipantsService.approveUser({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
        if (participant) {
          participant.isDisapproved = false;
        }
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  disapproveUser(userId:string){
    this.VolunteerFieldParticipantsService.disapproveUser({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
     // this.getPage();
     const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
        if (participant) {
          participant.isDisapproved = true;
          participant.reward = "0";

        }

      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onHeroChange(participantId: any, approvalStatus: string): void {
    const isApproved = approvalStatus === 'true';
    const participant = this.pageResponse.items.find((p:any) => p.participantId === participantId);
  // if (participant) {
  //   participant.isApproved = isApproved;
  //   participant.isDisapproved = !isApproved;
  //   if (!isApproved) {
  //     participant.reward = "0";

  //   }
  // }
if(isApproved==true)  {
this.approveHero(participantId);
}else{
this.disapproveHero(participantId);
}
  }
  approveHero(userId:string){
    this.VolunteerFieldParticipantsService.approvHero({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
        if (participant) {
          participant.isDisapproved = false;
        }
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  disapproveHero(userId:string){
    this.VolunteerFieldParticipantsService.disapproveHero({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
     // this.getPage();
     const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
        if (participant) {
          participant.isDisapproved = true;
        }

      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onSuperVisorChange(participantId: any, approvalStatus: string): void {
    const isSupervisor = approvalStatus === 'true';
    const participant = this.pageResponse.items.find((p:any) => p.participantId === participantId);
  // if (participant) {
  //   participant.isSupervisor = isSupervisor;
  //   participant.isDisapproved = !isSupervisor;
  // }
if(isSupervisor==true)  {
this.approveSupervisor(participantId);
}else{
this. disapproveSupervisor(participantId);
}
  }
  approveSupervisor(userId:string){
    this.VolunteerFieldParticipantsService.approveSupervisor({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
        if (participant) {
        //  participant.isDisapproved = false;
        }
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  disapproveSupervisor(userId:string){
    this.VolunteerFieldParticipantsService.disapproveSupervisor({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
     // this.getPage();
     const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
        if (participant) {
             //      participant.isDisapproved = true;

        }

      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onvolunteerHoursEnter(itemId: any, event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.editvolunteerHours(itemId,inputValue);
  }
  editvolunteerHours(userId:string,value:string){
    this.VolunteerFieldParticipantsService.editVolunteerHours({participantId:userId,volunteerFieldId:this.id,value:value}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }
  onactualHoursEnter(itemId: any, event: KeyboardEvent): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.editactualHours(itemId,inputValue);
  }
  editactualHours(userId:string,value:string){
    this.VolunteerFieldParticipantsService.editActualHours({participantId:userId,volunteerFieldId:this.id,value:value}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })
  }

  viewUserProfile(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(UserProfilePopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:{
        id
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
        title:'حذف المتطوع',
        label:'اسم المتطوع',
        submit:()=>{
          this.VolunteerFieldParticipantsService.delete(element.id).pipe(
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

