import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelServicesService } from 'src/app/dashboard/services/excel-services.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { VolunteerFieldParticipantsService } from 'src/app/dashboard/services/volunteer-field-participants.service';
import { ResponseVM } from '../../core/models/response-vm';
import { environment } from 'src/environments/environment.prod';
import { VolunteeerFieldService } from 'src/app/dashboard/services/volunteeer-field.service';

@Component({
  selector: 'app-volunteer-field-participants',
  templateUrl: './volunteer-field-participants.component.html',
  styleUrls: ['./volunteer-field-participants.component.css']
})
export class VolunteerFieldParticipantsComponent {
  id:any
  pageResponse:any={page:1,pageSize:18,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:18,name:''};
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,private VolunteerFieldParticipantsService:VolunteerFieldParticipantsService
    ,private VolunteeerFieldService:VolunteeerFieldService
  ){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    this.loadQualifications();
  }
  ngOnInit(): void {
    this.pagedRequest= {pageNumber:1,pageSize:16,name:'',id:this.id};
    this.loadData();
      this.getPage();

    }
  items:any
  getPage(){
    this.pagedRequest.qualificationId=0
      this.VolunteerFieldParticipantsService.getApproved(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
            this.items = this.pageResponse.items;
            this.items.forEach((element: { image: any; }) => {

              if (!element.image || element.image.trim() === '') {
                element.image = environment.baseImageUrl +'assets/male.png';
              } else {
                element.image = environment.baseImageUrl + element.image;
              }
            });
        }
      });
  }
  volunteerfield:any
  loadData(){
    this.VolunteeerFieldService.getById(this.id).subscribe(response => {
      this.volunteerfield = response.data;
    });
  }
  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;
    return Math.ceil(totalCount / pageSize);
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:18,name:'',id:this.id};
    this.getPage();
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:18,name:'',id:this.id};
    this.getPage();
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
     this.getPage();
  }
}
