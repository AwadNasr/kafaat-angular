import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Component({
  selector: 'app-scroll-magazine',
  templateUrl: './scroll-magazine.component.html',
  styleUrls: ['./scroll-magazine.component.css']
})
export class ScrollMagazineComponent implements OnInit,AfterViewInit{
  @Output() numberSelected = new EventEmitter<number>();
  items:any[]=[]
  itemsDisplay:any[]=[{title:'جميع المجلات',id:0,isSelected:true}]
  isDropDownVisible:boolean
  constructor(private service:KafaatMainService) {
  
    
  }
  ngAfterViewInit(): void {
   window.onclick=(event)=>{
    if(event.target!=document.getElementById('open')){
      this.isDropDownVisible=false;
    }
   }
  }
  ngOnInit(): void {
   this.service.programService.geAll().subscribe(response=>{
    if(response.statusCode=='200'){
      this.items=response.data
      var length=this.items.length>5?5:this.items.length
        for(var i=0;i<length;i++){
          this.itemsDisplay.push(this.items.pop())
      }
      if(this.items.length>0)
      this.itemsDisplay.push({title:'المزيد',id:-1})
    }
   })
  }


 
  index:number=0;
  onTap(index:number):void{
    if(index!=-1){
      console.log(index);
      this.numberSelected.emit(index);
    this.index=index;
    this.itemsDisplay.forEach(e=>e.isSelected=false)
    this.itemsDisplay.find(x=>x.id==index).isSelected=true
    
    }else{
      this.isDropDownVisible=!this.isDropDownVisible
    }
  }

  // slideConfig = {
  //   "slidesToShow": 7,
  //   "slidesToScroll": 1,
  //   "infinite": false,
  //   "responsive": [

  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //         slidesToScroll: 1,
  //         infinite: false,

  //       }
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1
  //       }
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       }
  //     }
  //   ]
  // };
}

