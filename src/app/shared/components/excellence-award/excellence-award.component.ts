import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcellenceAwardService } from 'src/app/dashboard/services/excellence-award.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ReadingClubService } from 'src/app/dashboard/services/reading-club.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { JoinAwardComponent } from '../join-award/join-award.component';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-excellence-award',
  templateUrl: './excellence-award.component.html',
  styleUrls: ['./excellence-award.component.css']
})
export class ExcellenceAwardComponent {
  @Output() idChange: EventEmitter<number> = new EventEmitter<number>();
  navList:any[];
  allQualifications:any[];
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:1,name:''};
  excellenceAward:any;
  excellenceAwardId:number;
  
  constructor(private route:ActivatedRoute,private service:MainDashoardService,private router:Router,private changeDetectorRef: ChangeDetectorRef
    ,public dialog: MatDialog,private excellenceAwardService:ExcellenceAwardService) {
  }
  ngOnInit(): void {
    this.loadQualifications();
   }
  loadQualifications(){
    this.service.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.allQualifications = res.data;
          this.navList = [];

          for (let i = 0; i < this.allQualifications.length; i++) {

            this.navList.push({
              id: this.allQualifications[i].id,
              label: this.allQualifications[i].name,
              isSelected: i === 0,
            });
          }
          this.idChange.emit(8);
          this.getPage();
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  async getPage(id:number = 10007){
    this.pagedRequest= {pageNumber:1,pageSize:1,name:'',id:id};
    await this.excellenceAwardService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.excellenceAward = res.items[0]?.description;
          this.excellenceAwardId=res.items[0]?.id;
          if(this.excellenceAward ==undefined){
            this.excellenceAward="لا توجد جوائز تفوق متاحة لهذا المؤهل"
          }
          //console.log(res.items[0].id);
          let sharedId=res?.items[0]?.id;
          this.changeDetectorRef.detectChanges();
          //console.log(sharedId);
          this.idChange.emit(sharedId);
          console.log('ID emitted from Component A:',sharedId);
      }
    });
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);

    this.getPage(id);

  }
  windowWidth: number = 0;
  joinAward(){
const dialogRef = this.dialog.open(JoinAwardComponent, {
  width:this.windowWidth<767?'80%':(this.windowWidth<1300?'50%':'40%'),
  data:{
    id:this.excellenceAwardId,
  }
});
  }
}
