import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcellencePrizeService } from 'src/app/dashboard/services/excellence-prize.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PagedRequest } from '../../core/models/paged-request';
import { JoinExcellencePrizeComponent } from '../join-excellence-prize/join-excellence-prize.component';
import { ExcellencePrizeParticipantsService } from 'src/app/dashboard/services/excellence-prize-participants.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-excellence-prize',
  templateUrl: './excellence-prize.component.html',
  styleUrls: ['./excellence-prize.component.css']
})
export class ExcellencePrizeComponent {
  prize:any;
  prizes:any;
  prizeContentValues:any
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  startDate:any
  endDate:any;
  IsParticipant:boolean=true
  excellencePrizeId:any
  id:any
  currentPrizeId: number;
  constructor(public service:MainDashoardService,private router: Router,private excellencePrizeService:ExcellencePrizeService
    ,private ExcellencePrizeParticipantsService:ExcellencePrizeParticipantsService,private authService:AuthService,private route: ActivatedRoute
  ) {
     this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }
  ngOnInit(): void {
    this.pagedRequest.id=0;
      this.loadExcellencePrize();

    }
  loadExcellencePrize(){
    if (!isNaN(this.id)){
      this.pagedRequest.id=this.id;
      this.excellencePrizeService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            //this.prizes=res.items;
            this.prize = res.items[0];
            this.prizeContentValues=this.prize.staticContents[1].staticContentValues;
            this.prize.staticContents[0].staticContentValues[0].description =
      this.prize.staticContents[0].staticContentValues[0].description.replace(/\r\n/g, '<br/>');
           // console.log(this.prizes);
           this.currentPrizeId=this.id
           this.getAll();
            this.isParticipant();
        }
      });

    }else{
      this.excellencePrizeService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
         //   this.prizes=res.items;
            this.prize = res.items[0];
            this.prizeContentValues=this.prize.staticContents[1].staticContentValues;
            this.prize.staticContents[0].staticContentValues[0].description =
      this.prize.staticContents[0].staticContentValues[0].description.replace(/\r\n/g, '<br/>');
            //console.log(this.prizes);
            this.currentPrizeId=this.prize.id
            this.getAll();

            this.isParticipant();
        }
      });
    }

  }
  getAll() {
    this.excellencePrizeService.getAlls(this.currentPrizeId).subscribe({
        next: (res: any) => {
            this.prizes = res.data;
        }
    });
}
  windowWidth: number = 0;
  joinPrize(id:any){
    const dialogRef = this.service.dialog.open(JoinExcellencePrizeComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:id,
      height:'70vh'
    });
  }
  checkDate(dateTo: any): boolean {
    let dateNow = new Date();
    let currentDate = dateNow.toISOString().slice(0, 10);
    let DateTo = new Date(dateTo).toISOString().slice(0, 10);
    if (currentDate <= DateTo) {
      return false;
    } else {

      return true;
    }
  }
  isParticipant(){
    this.ExcellencePrizeParticipantsService.isParticipant({"readingClubId":this.prize.id, "participantId":this.authService.currentUser().id}).subscribe({
      next:(res:any)=>{
        this.IsParticipant=res;
      }
    });
  }
  getApproval(){
    this.ExcellencePrizeParticipantsService.getApproval({"participantId":this.authService.currentUser().id, "excellencePrizeId":this.prize.id}).subscribe({
      next:(res:any)=>{
        if (res.statusCode == 200) {
          this.service.toastService.success(res.message);
        }
      }
    });
  }

}
