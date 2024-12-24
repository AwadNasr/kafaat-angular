import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { ExcellencePrizeParticipantsService } from '../../services/excellence-prize-participants.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { PlacesService } from '../../services/places.service';
import { DisapproveParticipantComponent } from '../disapprove-participant/disapprove-participant.component';

@Component({
  selector: 'app-judging-prize',
  templateUrl: './judging-prize.component.html',
  styleUrls: ['./judging-prize.component.css']
})
export class JudgingPrizeComponent {

  id:any
  pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  currentYear: string
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,private excellencePrizeParticipantsService:ExcellencePrizeParticipantsService
  ,private PlacesService:PlacesService){
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
    this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
    this.getPage();
    this.loadPlaces();
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
      this.excellencePrizeParticipantsService.getPageAsync(this.pagedRequest).subscribe({
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
  places:any
  loadPlaces(){
    this.PlacesService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.places = res.data;
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
    this.excellencePrizeParticipantsService.editReward({participantId:userId,excellencePrizeId:this.id,value:value}).subscribe(response=>{
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
      participant.placeId = null;
    }
  }
if(isApproved==true)  {
this.approveUser(participantId);
}else{
this.disapproveUser(participantId);
}
  }
  approveUser(userId:string){
    this.excellencePrizeParticipantsService.approveUser({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
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
  onPlaceChange(participantId: any, approvalStatus: number): void {
    this.excellencePrizeParticipantsService.editPlace({participantId:participantId,excellencePrizeId:this.id,placeId:approvalStatus}).subscribe(response=>{
      if(response.statusCode=='200'){
      this.service.toastService.success(response.message);
      }else{
        this.service.toastService.error(response.message);
      }
    })

  }
  disapproveUser(userId:string){
    // this.excellencePrizeParticipantsService.disapproveUser({participantId:userId,excellencePrizeId:this.id}).subscribe(response=>{
    //   if(response.statusCode=='200'){
    //   this.service.toastService.success(response.message);
    //  // this.getPage();
    //  const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
    //     if (participant) {
    //       participant.isDisapproved = true;
    //       participant.reward = "0";
    //       participant.placeId = null;
    //     }

    //   }else{
    //     this.service.toastService.error(response.message);
    //   }
    // })
   const obj={
    participantId:userId,
    excellencePrizeId:this.id
   };
    const dialogRef = this.service.dialog.open(DisapproveParticipantComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:obj,
      height:'40vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      const participant = this.pageResponse.items.find((p:any) => p.participantId === userId);
        if (participant) {
          participant.isDisapproved = true;
          participant.reward = "0";
          participant.placeId = null;
        }
    });
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
