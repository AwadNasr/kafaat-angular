import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ProgramsService } from '../../services/programs.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-carousal-home',
  templateUrl: './carousal-home.component.html',
  styleUrls: ['./carousal-home.component.css']
})
export class CarousalHomeComponent implements OnInit {
  @ViewChild('slickCarousel', { static: false }) slickCarousel: SlickCarouselComponent | undefined;
  slides:any[]
constructor(private service:ProgramsService,private router:Router) {


}
  ngOnInit(): void {
    //this.loadPrograms();
    this.getProgramsFromLocalStorage();
  }
  // loadPrograms(){
  //   this.service.geAll().subscribe(response=>{
  //     if(response.statusCode=='200'){
  //       this.slides=response.data
  //     }
  //   })
  // }
  getProgramsFromLocalStorage(){
    const storedPhotos = localStorage.getItem('programs');
    if (storedPhotos) {
      this.slides = JSON.parse(storedPhotos);
    } else {
      this.slides = [];
    }
  }

  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 1,
    "infinite": false,
    'rtl':true,
    "responsive": [

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };
  scrollNext() {

    this.slickCarousel!.slickNext();
  }

  scrollBack() {

    this.slickCarousel!.slickPrev();
  }

  onItemClick(item: any, index: number) {
    // if (item.onClickItem) {
    //   item.onClickItem(item, index);
    // }
    this.router.navigate([`/kafaat/program-details/`+index])
  }


  onCarouselItemMouseEnter(index: number) {
    const element = document.getElementById('p' + index);
    element!.style.color = 'var(--main-color)';
  }

  onCarouselItemMouseLeave(index: number) {
    const element = document.getElementById('p' + index);
    element!.style.color = '';
  }


}

