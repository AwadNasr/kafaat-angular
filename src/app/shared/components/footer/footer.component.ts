import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactInformationModel } from 'src/app/dashboard/core/models/contact-information-model';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { DialogVideoImageComponent } from '../dialog-video-image/dialog-video-image.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year:any;
  programs:any[]=[];
   videoUrl:string = 'https://www.youtube.com/embed/v69praWH6cs?si=ennlWOhMnXzh2x5S';
  contactInformationItems:ContactInformationModel = {
    id:0,
    email:'',
    facebookLink:'',
    instagramLink:'',
    location:'',
    snapchatLink:'',
    telegramLink:'',
    title:'',
    twitterLink:'',
    whatsapp:'',
    youtubeLink:'',
    linkedInLink:'',
    introductoryVideoLink:'',
    liveFeedLink:'',
    year:'',
    activityNum:0,
    userNum:0
  };
  constructor(private service:MainDashoardService){
    this.get();
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.videoUrl = this.contactInformationItems.liveFeedLink;
  }


  get(){
    this.service.programsService.getAll().subscribe(res=>{
      if(res.statusCode=='200'){
        this.programs=res.data
        localStorage.setItem('programs', JSON.stringify(this.programs));
      }
    })
    this.service.contactInformationService.get().subscribe({
      next:(res:ResponseVM)=>{
        if (res.statusCode == 200) {
          this.contactInformationItems = res.data as ContactInformationModel;
        }
        else {
          this.service.toastService.error(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
        this.service.toastService.error(errorMessage);
      }
    });
  }
  @ViewChild('dialog', { static: true }) dialogComponent: DialogVideoImageComponent | undefined;
  openModal(){
    this.dialogComponent.openVideo(this.contactInformationItems.liveFeedLink);
   }
}
