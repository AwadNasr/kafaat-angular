import { Component,ElementRef,Renderer2,Type,AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { ContactInformationModel } from 'src/app/dashboard/core/models/contact-information-model';
import { DisplayContentComponent } from 'src/app/shared/components/display-content/display-content.component';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from '../../core/models/response-vm';
import { DialogVideoImageComponent } from 'src/app/shared/components/dialog-video-image/dialog-video-image.component';
import { Router } from '@angular/router';
import {
  trigger, style, animate, transition, group
 } from '@angular/animations';
import { ActivityParticipantsService } from 'src/app/dashboard/services/activity-participants.service';
import { ActivityService } from '../../services/activity.service';
import { SitePhotosService } from 'src/app/dashboard/services/site-photos.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  animations: [
    trigger('slideInLeft', [
      // transition(':enter', [
      //   style({ height: '0px', overflow: 'hidden' }),
      //   group([animate('5250ms ease-out', style({ height: '!' }))]),
      // ]),
      // transition(':leave', [
      //   style({ height: '!', overflow: 'hidden' }),
      //   group([animate('9250ms ease-out', style({ height: '0px' }))]),
      // ]),
     ///

        transition(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('1000ms ease-out', style({ transform: 'translateX(0)' })),
        ]),
        transition(":leave", [
          animate('1000ms ease-out', style({ transform: 'translateX(-100%)' })),
        ])

      ///
      // transition(':enter', [
      //   style({ opacity: 0 }),
      //   animate(1000, style({ opacity: 1 }))
      // ]),
      // transition(':leave', [
      //   style({ opacity: 1 }),
      //   animate(1000, style({ opacity: 0 }))
      // ])
    ]),
    trigger('slideInRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(":leave", [
        animate('1000ms ease-out', style({ transform: 'translateX(100%)' })),
    ])
    ])],
})
export class HomePageComponent implements AfterViewInit, OnInit{
photos:any
  showOverlay = false;
  activityCounter = 0;
  usersCounter = 0;
  activitiesCount: any[] = [];
  activitiesMeberCount: any[] = [];
  // homeVideoPath:string = "/assets/videos/video.mp4";
  homeVideoPath:string = "";
  homeImagePath:string = '/assets/images/Hero-image.png';
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
  @ViewChild('dialog', { static: false }) dialogComponent: DialogVideoImageComponent | undefined;
  videoUrl:string = 'https://www.youtube.com/embed/v69praWH6cs?si=ennlWOhMnXzh2x5S';
  constructor(private adminService:MainDashoardService,
    private router: Router,
    private activityParticipantsService:ActivityParticipantsService,
    private activityService:ActivityService,
    private renderer: Renderer2, private el: ElementRef,private service:MainDashoardService,private SitePhotosService:SitePhotosService) {

      this.loadPhotos();
  }
  ngOnInit(): void {
    this.getMixData();
    const storedPhotos = localStorage.getItem('sitePhotos');
   // if(storedPhotos == null){
    //  this.loadPhotos();
   // }
    this.loadInformationContact();
    this.getIntroductoryVideoUrl();
    // this.getAllActivityCount();
    // this.getAllActivityParticipantCount();


  }
  loadPhotos(){
    this.SitePhotosService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.photos = res.data;
          localStorage.setItem('sitePhotos', JSON.stringify(this.photos));
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }

  loadInformationContact(){
    this.service.contactInformationService.get().subscribe({
      next:(res:ResponseVM)=>{
        if (res.statusCode == 200) {
          this.contactInformationItems = res.data as ContactInformationModel;
          let interval = setInterval(()=>{
            this.activityCounter++;
            if(this.activityCounter == this.contactInformationItems.activityNum) clearInterval(interval);
          },30);
          let interval2 = setInterval(()=>{
            this.usersCounter = this.usersCounter + 10;
            if(this.usersCounter == this.contactInformationItems.userNum) clearInterval(interval2);
            else if(this.usersCounter >= this.contactInformationItems.userNum){
              this.usersCounter = this.contactInformationItems.userNum;
              clearInterval(interval2);
            }
          },9)
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
  ngAfterViewInit(): void {
    this.playAnimation()

  }

  openOrClosNav(value:boolean):void{
    this.showOverlay=value;
  }


  component: Type<any> = DisplayContentComponent;

  playAnimation(){
    const elements = this.el.nativeElement.querySelectorAll('.top-anim');
    const elements2 = this.el.nativeElement.querySelectorAll('.top-30');
    elements.forEach((element:any) => {

      this.renderer.setStyle(element, 'top', '0');
    });

    elements2.forEach((element:any) => {
     if(window.innerWidth<720){
      this.renderer.setStyle(element, 'top', '-40px');
     }else{
      this.renderer.setStyle(element, 'top', '30%');
     }
    });
  }
  getMixData(){
    this.adminService.mixService.get().subscribe({
      next:(res:ResponseVM)=>{
       if(res.statusCode == 200){
        if(res.data.homeImagePath.length > 0){
          this.homeImagePath = res.data.homeImagePath;
          this.homeVideoPath = res.data.homeVideoPath;
          console.log(this.homeVideoPath);

        }
        // this.introductoryFilePath = res.data.introductoryFilePath;
       }
      }
    });
  }

  isDevice(){
    return window.innerWidth<720;
  }
  openModal(){
    console.log(this.videoUrl);

    this.dialogComponent.openVideo(this.videoUrl);
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
naviagteToPrograms(){
//  this.router.navigate(['/kafaat/programs']);
window.open('https://www.youtube.com/@kftalmajed/podcasts', '_blank');
}
// getArticles(){
//   this.service.articleService.getAll();
// }
// getAllActivityCount(){
//   this.activityService.getAll().subscribe({
//     next:(res:ResponseVM)=>{
//       if(res.statusCode == 200){
//         this.activitiesCount = res.data;
//         let interval = setInterval(()=>{
//           this.activityCounter++;
//           if(this.activityCounter == this.activitiesCount.length) clearInterval(interval);
//         },30)
//       }
//     }
//   })
// }
// getAllActivityParticipantCount(){
//   this.activityParticipantsService.getAllUsers().subscribe({
//     next:(res:ResponseVM)=>{
//       if(res.statusCode == 200){
//         this.activitiesMeberCount = res.data;
//         let interval2 = setInterval(()=>{
//           this.usersCounter++;
//           if(this.usersCounter == this.activitiesMeberCount.length) clearInterval(interval2);
//         },50)
//       }
//     }
//   })
// }
}
