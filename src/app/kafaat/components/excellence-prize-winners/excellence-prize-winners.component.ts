import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeParticipantsService } from 'src/app/dashboard/services/excellence-prize-participants.service';
import { ExcellencePrizeService } from 'src/app/dashboard/services/excellence-prize.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from '../../core/models/response-vm';
import { environment } from 'src/environments/environment';
import { ExcellencePrizeReportService } from 'src/app/dashboard/services/excellence-prize-report.service';
@Component({
  selector: 'app-excellence-prize-winners',
  templateUrl: './excellence-prize-winners.component.html',
  styleUrls: ['./excellence-prize-winners.component.css']
})
export class ExcellencePrizeWinnersComponent {
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  pageResponse:any={page:1,pageSize:16,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:16,name:''};
  id:any
  items:any
  statics:any
  report:any
  prizes:any
  constructor(private route: ActivatedRoute,private service:MainDashoardService,private excellencePrizeService:ExcellencePrizeService
    ,private ExcellencePrizeParticipantsService: ExcellencePrizeParticipantsService,private ExcellencePrizeReportService:ExcellencePrizeReportService
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  loadWinnersStatics(){
    this.ExcellencePrizeParticipantsService.getWinnersstatics(this.id).subscribe({
      next:(res:any)=>{
          this.statics = res.result.data
      }
    });
  }
  getReport(){
    this.ExcellencePrizeReportService.getLast(this.id).subscribe({
      next:(res:any)=>{
          this.report = res.data
      }
    });

  }
  ngOnInit(): void {
    this.loadQualifications();
     this.loadWinnersStatics();
     this.getReport();
    this.pagedRequest= {pageNumber:1,pageSize:16,name:'',id:this.id};
    this.getPage();
    this.getAll()
   }
   getPage(id:number = 10007){
    this.pagedRequest.qualificationId=id
      this.ExcellencePrizeParticipantsService.getWinners(this.pagedRequest).subscribe({
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
  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;
    return Math.ceil(totalCount / pageSize);
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:16,name:''};
    this.getPage(this.qualificationId);
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:16,name:''};
    this.getPage(this.qualificationId);
  }

  goToLink(url: string){

    url =  url

    window.open(url, "_blank");
}
getAll() {
  this.excellencePrizeService.getAlls(this.id).subscribe({
      next: (res: any) => {
          this.prizes = res.data;
      }
  });
}
}
