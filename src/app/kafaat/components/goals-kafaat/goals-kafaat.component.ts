import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { ResponseVM } from '../../core/models/response-vm';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { DialogVideoImageComponent } from 'src/app/shared/components/dialog-video-image/dialog-video-image.component';
import { PdfPopupComponent } from '../pdf-popup/pdf-popup.component';

@Component({
  selector: 'app-goals-kafaat',
  templateUrl: './goals-kafaat.component.html',
  styleUrls: ['./goals-kafaat.component.css']
})
export class GoalsKafaatComponent implements OnInit,AfterViewInit {
  items:any[] = [];
  test:string="ali";
  introductoryFilePath:string = '';
  videoUrl:string = 'https://www.youtube.com/embed/v69praWH6cs?si=ennlWOhMnXzh2x5S';
  @ViewChild('dialog', { static: false }) dialogComponent: DialogVideoImageComponent | undefined;
  constructor(private service:KafaatMainService,private adminService:MainDashoardService){}
  ngAfterViewInit(): void {
    this.getItems();
  }
  ngOnInit(): void {
    this.getItems();
    this.getIntroductoryVideoUrl();
    this.getMixData();
  }
  getMixData(){
    this.adminService.mixService.get().subscribe({
      next:(res:ResponseVM)=>{
       if(res.statusCode == 200){
        this.introductoryFilePath = res.data.introductoryFilePath;
       }
      }
    });
  }
  
  getItems(){
    this.service.aboutUsService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        this.items = res.data;
        // alert(this.items.length)
      },
      error:(error)=>{
        this.service.toastService.error("هناك خطأ فى استرجاع بيانات مؤســـسـوا كــفاءات")
      }
    })
  }
  getIntroductoryVideoUrl(){
    this.adminService.contactInformationService.get().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode == 200){
          let link:string = res.data.introductoryVideoLink;
          this.videoUrl = link;
          // if(link.includes("ennlWOhMnXzh2x5S")){
          //   this.videoUrl = link;
          // }else{
          //   this.videoUrl = this.covertToRelatedFormat(link);
          // }
        }
      }
    })
  }
  trackByFn(index: number, item: any): any {
    return item.id; // Replace 'id' with the actual identifier property of your item
  }
  openModal(){
    this.dialogComponent.openVideo(this.videoUrl);
  }
  showIntroductoryFilePath(){
    this.service.dialog.open(PdfPopupComponent,{
      width:'99%',
      height:'90%',
      data:{
        cvPdf:this.introductoryFilePath,
      }
    })
  }
}
