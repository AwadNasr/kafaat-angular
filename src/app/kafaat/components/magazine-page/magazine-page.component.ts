import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MagazineService } from 'src/app/dashboard/services/magazine.service';
import { PagedRequest } from '../../core/models/paged-request';
import { PagedResponse } from '../../core/models/paged-response';
import { MagazinePageService } from 'src/app/dashboard/services/magazine-page.service';
import { HttpClient } from '@angular/common/http';
import { SlickCarouselComponent } from 'ngx-slick-carousel';


@Component({
  selector: 'app-magazine-page',
  templateUrl: './magazine-page.component.html',
  styleUrls: ['./magazine-page.component.css']
})
export class MagazinePageComponent implements OnInit,AfterViewInit {
  @ViewChild('book') book: ElementRef;
  currentLocation = 0;
  papers:any[]=[]
  numOfPapers = this.papers.length;
  maxLocation = this.numOfPapers + 1;
  pageResponse:PagedResponse={page:1,pageSize:2,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:2000,name:''};
  items:any[]=[]
  constructor(private service:MagazinePageService,private service_m:MagazineService,private rouet:ActivatedRoute,
    private http: HttpClient,private cdr: ChangeDetectorRef) {
    rouet.params.subscribe(res=>{
      this.id=res['id']
      this.pagedRequest= {pageNumber:1,pageSize:2000,name:'',id:res['id']};
    })

  }
  ngAfterViewInit(): void {
   // window.addEventListener('resize', this.onResize.bind(this));
  }

  prepare(){
    setTimeout(() => {
      for (let index = 0; index < this.papers.length; index++) {
        document.getElementById('p'+index).style.zIndex=this.papers.length-(index)+""
        // console.log(this.papers.length-(index)+"" );

      }
    }, 100);
  }
  onResize(): void {


    this.cdr.detectChanges();  // This forces Angular to check for any changes
  }
  ngOnInit(): void {
    //window.addEventListener('resize', this.onResize.bind(this));
    this.service_m.getAll().subscribe(res=>{
      this.magazines=res.data,
      this.maxlength= this.magazines.length;
      console.log(this.magazines);

    })
    this.service_m.getById(this.id).subscribe(res=>{
      this.magazine=res.data
    })
   this.service.getPage(this.pagedRequest).subscribe(res=>{

    this.items=res.items
    for (let i = 0; i < this.items.length; i += 2) {

      const obj = {
          "firstElement": this.items[i],
          "secondElement": this.items.length==i+1?"":this.items[i + 1],
          "exists":(this.items.length)==(i+1)
      };
      this.papers.push(obj);
  }
  // this.papers=[1,2,3,4,5,6]
  this.numOfPapers = this.papers.length;
  this.maxLocation = this.numOfPapers + 1;
  this.prepare()
  // Manually trigger change detection after data changes
  this.cdr.detectChanges();
   })

  }

  magazine:any
  id:any
  magazines:any[]=[]

  startClick(){
   while(this.currentLocation!=0){
    this.goPrevPage();
   }
  }
  endClick(){
    while(this.currentLocation!=this.numOfPapers){
      this.goNextPage()
    }
  }

  downloadPdf(): void {
    const link = document.createElement('a');
    link.href = this.magazine.pdfPath;
    link.download = this.magazine.title+'.pdf';
    link.click();
  }
  @ViewChild('fullScreen') divRef: any;
  isFullScreen=false

  fullScreenfun(){
    const elem = this.divRef.nativeElement;
  if(!this.isFullScreen){


  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }
  this.isFullScreen=true

  }else{
    const doc = document as any;

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    }
    this.isFullScreen=false
  }
}

slideConfig = {
  "slidesToShow": 3,
  "slidesToScroll": 1,
  "infinite": false,
  'rtl':true,
  "responsive": [

    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,

      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      }
    }
  ]
};
@ViewChild('slickCarousel', { static: false }) slickCarousel: SlickCarouselComponent | undefined;
currentSlideIndex = 0;
swapSlideIndex=false;
maxlength=0;
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
openBook() {
  this.book.nativeElement.style.transform = 'translateX(-50%)';
}

closeBook(isAtBeginning: boolean) {
  if (isAtBeginning) {
    this.book.nativeElement.style.transform = 'translateX(0%)';
  } else {
    this.book.nativeElement.style.transform = 'translateX(100%)';
  }

}


goNextPage() {
  if (this.currentLocation < this.maxLocation-1) {
    const paper=document.getElementById('p'+this.currentLocation)
    if(this.currentLocation==0){
      this.openBook();
      paper.classList.add('flipped');
      paper.style.zIndex = (this.currentLocation)+"";
    }
    else if(this.currentLocation==this.numOfPapers-1){
      paper.classList.add('flipped');
      paper.style.zIndex = (this.currentLocation)+"";
      this.closeBook(false);
    }else{
      paper.classList.add('flipped');
      paper.style.zIndex = (this.currentLocation)+"";
    }
    this.currentLocation++;
  }
}

goPrevPage() {
  if (this.currentLocation > 0) {
    const paper=document.getElementById('p'+(this.currentLocation-1))
    if(this.currentLocation==1){
      this.closeBook(true);
      paper.classList.remove('flipped');
      paper.style.zIndex = this.numOfPapers+"";
    }else if(this.currentLocation==this.maxLocation-1){
      this.openBook();
      paper.classList.remove('flipped');
      paper.style.zIndex = "1";
    }else{
      paper.classList.remove('flipped');
      paper.style.zIndex = (this.maxLocation-this.currentLocation)+"";
    }
    this.currentLocation--;
  }
}
controllerVisible = false;
showController() {
  this.controllerVisible = true;
}
hideController() {
  this.controllerVisible = false;
}
}


