import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PublisherService } from 'src/app/dashboard/services/publisher.service';
import { PagedRequest } from '../../core/models/paged-request';
import { PagedResponse } from '../../core/models/paged-response';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-family-writings-details',
  templateUrl: './family-writings-details.component.html',
  styleUrls: ['./family-writings-details.component.css']
})
export class FamilyWritingsDetailsComponent {
  id:any
  publisher:any
  userId:any
  pageResponse:PagedResponse={page:1,pageSize:16,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:16,name:''};
  pageResponse1:PagedResponse={page:1,pageSize:16,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest1:PagedRequest = {pageNumber:1,pageSize:16,name:''};
  items:any[]=[];
  items1:any[]=[];
  familyWritingsId:any
  elementType = 'url';

  constructor(public service:MainDashoardService,private router: Router,private PublisherService:PublisherService
    ,private route: ActivatedRoute
      ) {
         this.route.params.subscribe(params => {
          this.id = params['id'];
        });
      }
      ngOnInit(): void {

        this.loadPublisher();
    }
      loadPublisher(): void {
        this.PublisherService.getById(this.id).subscribe({
            next: (res: any) => {
                this.publisher=res;
                this.userId=res.participantId;
                this.familyWritingsId=res.familyWritingsId
                this.loadData(this.userId);
                this.loadData1(this.familyWritingsId)
            },
        });
    }
    loadData(id:number){
      this.pagedRequest.id=id;
      this.PublisherService.getPublications(this.pagedRequest).subscribe(res=>{
        this.pageResponse=res;
        this.items = this.pageResponse.items.filter(item => item.id != this.id);
        this.maxlength= this.items.length+1;

      })
    }
    loadData1(id:number){
      this.pagedRequest1.id=id;
      this.PublisherService.getPageApproved(this.pagedRequest1).subscribe(res=>{
        this.pageResponse1=res;
        this.items1 = this.pageResponse1.items.filter(item => item.id != this.id);
        this.maxlength= this.items1.length+1;

      })
    }
    @ViewChild('slickCarousel', { static: false }) slickCarousel: SlickCarouselComponent | undefined;
  currentSlideIndex = 0;
  swapSlideIndex=false;
  maxlength=0;
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
          slidesToShow: 2,
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
  openLink(link:any) {

    window.open(link, '_blank');
  }
}
