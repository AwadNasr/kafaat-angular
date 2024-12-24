import { Component, ViewChild,OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ExcellencePrizeService } from 'src/app/dashboard/services/excellence-prize.service';
import { ReadClubService } from 'src/app/dashboard/services/read-club.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Component({
  selector: 'app-minshat-carousal',
  templateUrl: './minshat-carousal.component.html',
  styleUrls: ['../manashet-item/manashet-item.component.css','./minshat-carousal.component.css']
})
export class MinshatCarousalComponent implements OnInit {
   slides:any[]=[];
   prizes:any
   prizeSlide:any;
   pagedRequest:PagedRequest = {pageNumber:1,pageSize:50,name:''};
   constructor(private service:KafaatMainService,private router: Router,private excellencePrizeService:ExcellencePrizeService
    ,private ReadClubService:ReadClubService
   ) {
   }
  //  @Output() slidesLength_dataEvent = new EventEmitter<number>();

   loadData(){
    this.service.activityService.getHigthLigthActivities().subscribe(response=>{
      if(response.statusCode=='200'){
        this.slides=response.data;
        this.maxlength= this.slides.length+1;
        // this.slidesLength_dataEvent.emit(this.slides.length111);
      }
    })
   }
   loadExcellencePrize(){
      this.excellencePrizeService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.prizes=res.items;
            this.prizeSlide = res.items[0];
            console.log(this.prizeSlide);

        }
      });
    }
    readClub:any;
    readClubs:any;
    loadReadClub(){
      this.ReadClubService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.readClub = res.items[0];
            this.readClubs=res.items;
        }
      });
  }


   @ViewChild('slickCarousel', { static: false }) slickCarousel: SlickCarouselComponent | undefined;
   currentSlideIndex = 0;
   swapSlideIndex=false;
   maxlength=0;
   ngOnInit(): void {
    this.loadData();
    this.pagedRequest.id=0;
    this.loadExcellencePrize();
    this.loadReadClub();
    }
   slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "infinite": false,
    "responsive": [

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,

        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  scrollNext() {
    if(this.swapSlideIndex && this.currentSlideIndex<this.maxlength-1){
    this.currentSlideIndex += 2;
    }
    else if(!this.swapSlideIndex && this.currentSlideIndex<this.maxlength-1){
      this.currentSlideIndex += 1;
    }
    this.swapSlideIndex=false;
    this.slickCarousel!.slickNext();
  }

  scrollBack() {

    this.slickCarousel!.slickPrev()
  }



  onMouseEnter(index:number):void{
    document.getElementById('d'+index)!.style.top='0';
  }
  onMouseLeave(index:number):void{
    document.getElementById('d'+index)!.style.top='-45px';
  }
  naviagteToDetails(id:any){
    this.router.navigate(['/kafaat/activity-details', id]);
  }
  naviagteToDetails1(id:any){
    this.router.navigate(['/kafaat/excellence-prize', id]);
  }

  naviagteToDetails2(id:any){
    this.router.navigate(['/kafaat/reading-club-trip', id]);
  }


}
