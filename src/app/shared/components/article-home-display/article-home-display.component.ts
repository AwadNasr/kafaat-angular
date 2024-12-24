import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-article-home-display',
  templateUrl: './article-home-display.component.html',
  styleUrls: ['./article-home-display.component.css']
})
export class ArticleHomeDisplayComponent {
  articles: any;
  @ViewChild('slickCarousel', { static: false }) slickCarousel: SlickCarouselComponent | undefined;
  currentSlideIndex = 0;
  swapSlideIndex=false;
  maxlength=0;
  constructor(private service: MainDashoardService,private router: Router) {

  }
  ngOnInit(): void {
    this.getArticles();

  }
  getArticles() {
    this.service.articleService.getAll().subscribe({
      next: (res: ResponseVM) => {
        if (res.statusCode == 200) {
          console.log(res);
          // this.articles = res.data.slice(-6)
          //this.articles = res.data.slice(0,6)
          this.articles = res.data
        }
      }
    })
  }
  naviagteToDetails(id:any){
    this.router.navigate(['/kafaat/article-details', id]);
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


}
