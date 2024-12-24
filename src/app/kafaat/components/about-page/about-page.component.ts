import { Component, OnInit, ViewChild } from '@angular/core';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from '../../core/models/response-vm';
import { DialogVideoImageComponent } from 'src/app/shared/components/dialog-video-image/dialog-video-image.component';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  imageNumber1:string = '/assets/images/about2.png';
  imageNumber2:string = '/assets/images/about3.png';
  imageNumber3:string = '/assets/images/about4.png';
  imageNumber4:string = '/assets/images/about5.png';
  imageNumber5:string = '/assets/images/about6.png';
  imageNumber6:string = '/assets/images/about7.png';
  @ViewChild('dialog', { static: false }) dialogComponent: DialogVideoImageComponent | undefined;
  documentedImageItems:any[]=[];
  videoUrl:string = 'https://www.youtube.com/embed/v69praWH6cs?si=ennlWOhMnXzh2x5S';
  constructor(private service:MainDashoardService){}
  ngOnInit(): void {
    this.getDocumentedImage();
    this.getIntroductoryVideoUrl();
  }
  getDocumentedImage(){
    this.service.documentedImageService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        this.documentedImageItems = res.data;
        this.imageNumber1 = this.documentedImageItems.find(x=>x.imageOrder==1) ?  this.documentedImageItems.find(x=>x.imageOrder==1).imagePath : '/assets/images/about2.png';
        this.imageNumber2 = this.documentedImageItems.find(x=>x.imageOrder==2) ?  this.documentedImageItems.find(x=>x.imageOrder==2).imagePath : '/assets/images/about3.png';
        this.imageNumber3 = this.documentedImageItems.find(x=>x.imageOrder==3) ?  this.documentedImageItems.find(x=>x.imageOrder==3).imagePath : '/assets/images/about4.png';
        this.imageNumber4 = this.documentedImageItems.find(x=>x.imageOrder==4) ?  this.documentedImageItems.find(x=>x.imageOrder==4).imagePath : '/assets/images/about5.png';
        this.imageNumber5 = this.documentedImageItems.find(x=>x.imageOrder==5) ?  this.documentedImageItems.find(x=>x.imageOrder==5).imagePath : '/assets/images/about6.png';
        this.imageNumber6 = this.documentedImageItems.find(x=>x.imageOrder==6) ?  this.documentedImageItems.find(x=>x.imageOrder==6).imagePath : '/assets/images/about7.png';
      }
    });
  }
  getIntroductoryVideoUrl(){
    this.service.contactInformationService.get().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode == 200){
          let link:string = res.data.introductoryVideoLink;
          this.videoUrl = link;
        }
      }
    })
  }


  showOverlay = false;
  openOrClosNav(value:boolean):void{
    this.showOverlay=value;
  }

  itemCardEnter(index:number):void{

    document.getElementById('p'+index)!.style.color='#005183';
    const imgElement = document.querySelector(`#img${index}`) as HTMLImageElement;
    console.log(imgElement)
  if (imgElement) {
    if(index==1){
      imgElement.src = 'assets/images/رفع مستوى التميز1.svg';
    }else if(index==2){
      imgElement.src = 'assets/images/رعاية الموهوبين1.svg';
    }else if(index==3){
      imgElement.src = 'assets/images/اكتشاف 1المواهب.svg';
    }else if(index==4){
      imgElement.src = 'assets/images/تنمية الجوانب الثقافية1.svg';
    }
  }

  }
  itemCardLeave(index:number):void{

    document.getElementById('p'+index)!.style.color='white';
    const imgElement = document.querySelector(`#img${index}`) as HTMLImageElement;

  if (imgElement) {
    if(index==1){
      imgElement.src = 'assets/images/رفع مستوى التميز.svg';
    }else if(index==2){
      imgElement.src = 'assets/images/رعاية الموهوبين.svg';
    }else if(index==3){
      imgElement.src = 'assets/images/اكتشاف المواهب.svg';
    }else if(index==4){
      imgElement.src = 'assets/images/تنمية الجوانب الثقافية.svg';
    }
  }
  }

  openModal(){
      this.dialogComponent.openVideo(this.videoUrl);
  }
}
