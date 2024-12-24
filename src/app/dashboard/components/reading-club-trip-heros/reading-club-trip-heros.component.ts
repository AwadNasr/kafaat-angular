import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ReadingClubTripsParticipantsService } from '../../services/reading-club-trips-participants.service';

@Component({
  selector: 'app-reading-club-trip-heros',
  templateUrl: './reading-club-trip-heros.component.html',
  styleUrls: ['./reading-club-trip-heros.component.css']
})
export class ReadingClubTripHerosComponent {
  id:any
  pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  currentYear: string;
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  windowWidth: number = 0;
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private servicee:KafaatMainService,private ReadingClubTripsParticipantsService:ReadingClubTripsParticipantsService){
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
      this.ReadingClubTripsParticipantsService.getHeos(this.pagedRequest).subscribe({
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
}
