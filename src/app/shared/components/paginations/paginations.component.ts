import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginations',
  templateUrl: './paginations.component.html',
  styleUrls: ['./paginations.component.css']
})
export class PaginationsComponent {
  @Input() pagesNumber:any=5;
  @Input() currentPage:any=1;
  @Input() hasNextPage:boolean=true;
  @Input() hasPreviousPage:boolean=false;
  @Output() next = new EventEmitter<number>();
  @Output() back = new EventEmitter<number>();
  getfirstIndex(){
    return (this.pagesNumber)-(this.pagesNumber - this.currentPage);
  }
  getSecondIndex(){
    return (this.pagesNumber)-(this.pagesNumber - this.currentPage-1);
  }

  getThiredIndex(){
    return (this.pagesNumber)-(this.pagesNumber - this.currentPage-2);
  }
  onNextSubMit(){
    if(this.hasNextPage){
    this.next.emit(this.currentPage+1)
    }
  }
  onBackSubmit(){
    if(this.hasPreviousPage){
    this.back.emit(this.currentPage-1)
    }
  }
}


