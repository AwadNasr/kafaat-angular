import { Component, ViewChild } from '@angular/core';
import { PagedRequest } from '../../core/models/paged-request';
import { PagedResponse } from '../../core/models/paged-response';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PublisherService } from 'src/app/dashboard/services/publisher.service';
import { ResponseVM } from '../../core/models/response-vm';
import { FamilyWritingsService } from 'src/app/dashboard/services/family-writings.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { MatDialog } from '@angular/material/dialog';
import { JoinVolunteerComponent } from 'src/app/shared/components/join-volunteer/join-volunteer.component';
import { JoinFamilyWritingsComponent } from '../join-family-writings/join-family-writings.component';

@Component({
  selector: 'app-family-writings',
  templateUrl: './family-writings.component.html',
  styleUrls: ['./family-writings.component.css']
})
export class FamilyWritingsComponent {
  pageResponse:PagedResponse={page:1,pageSize:15,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:15,name:''};
  items:any[]=[];
  navList:any[];
  id:any;
  allFamilyWritings:any[];
  constructor(public service:MainDashoardService,private router: Router,private PublisherService:PublisherService
    ,private FamilyWritingsService:FamilyWritingsService,public dialog: MatDialog
,private route: ActivatedRoute
  ) {
    this.loadFamilyWritings();
    //  this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
  }
  ngOnInit(): void {
   this.loadData();
   this.getSitePhotosFromLocalStorage();
  }
  loadData(id:number= 3){
    this.pagedRequest.id=id;
    this.PublisherService.getPageApproved(this.pagedRequest).subscribe(res=>{
      this.pageResponse=res;
      this.items=this.pageResponse.items;

    })
  }
  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;
    return Math.ceil(totalCount / pageSize);
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:16,name:''};
    this.loadData()
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:16,name:''};
    this.loadData()
  }
  loadFamilyWritings(){
    this.FamilyWritingsService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.allFamilyWritings = res.data;

          this.navList = [];
          for (let i = 0; i < this.allFamilyWritings.length; i++) {
              this.navList.push({
                id: this.allFamilyWritings[i].id,
                label: this.allFamilyWritings[i].name,
                statics: this.allFamilyWritings[i].statics,
                isSelected: i === 0,
              });
          }
          this.maxlength= this.navList.length+1;
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
    this.id=id
     this.loadData(id);
  }
  @ViewChild('slickCarousel', { static: false }) slickCarousel: SlickCarouselComponent | undefined;
  currentSlideIndex = 0;
  swapSlideIndex=false;
  maxlength=0;
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "infinite": false,
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
  windowWidth: number = 0;
joinVolunteer(){
  const dialogRef = this.dialog.open(JoinFamilyWritingsComponent, {
    width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
    height:'70vh'
  });
}
photos:any
getSitePhotosFromLocalStorage(){
  const storedPhotos = localStorage.getItem('sitePhotos');
  if (storedPhotos) {
    this.photos = JSON.parse(storedPhotos);
    console.log(this.photos);

  } else {
    this.photos = [];
    console.log(this.photos);
  }
}
}
