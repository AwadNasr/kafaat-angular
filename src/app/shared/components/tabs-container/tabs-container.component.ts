import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.css']
})
export class TabsContainerComponent {
  @Output() tabSelected: EventEmitter<number> = new EventEmitter<number>();
  indexSelected=0
  onTap(index:number):void{
    this.indexSelected=index;
    this.tabSelected.emit(index);
  }
  @ViewChild('targetElement', { static: true }) targetElement: ElementRef|undefined;
  @ViewChild('nav', { static: true }) nav: ElementRef|undefined;
  @ViewChild('divHead', { static: true }) divHead: ElementRef|undefined;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {

    const rect = this.targetElement!.nativeElement.getBoundingClientRect();

    if (rect.top <45) {
      document.getElementById('navbar')!.style.display='none';
      this.nav!.nativeElement.classList.add('fix-tabs');
      //this.divHead!.nativeElement.style.display='block';
    } else {
      document.getElementById('navbar')!.style.display='block';
      this.nav!.nativeElement.classList.remove('fix-tabs');
    //  this.divHead!.nativeElement.style.display='none';
    }
  }

  slideConfig = {
    "slidesToShow": 6,
    "slidesToScroll": 1,
    "infinite": false,
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
}
