import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-controller-pdf',
  templateUrl: './controller-pdf.component.html',
  styleUrls: ['./controller-pdf.component.css']
})
export class ControllerPdfComponent {
[x: string]: any;
  @Input() controller:any
  @Input() currentPage:any
  @Output() nextClick = new EventEmitter<string>();
  @Output() previosClick = new EventEmitter<string>();
  @Output() stratClick = new EventEmitter<string>();
  @Output() endClick = new EventEmitter<string>();
  @Output() download = new EventEmitter<string>();
  @Output() fullScreen = new EventEmitter<string>();

  getCell(value:any){
    return Math.ceil(value/2)
  }

  FullScreen(){
    this.fullScreen.emit()
  }
  DownladClick(){
    this.download.emit()
  }
  NextClick(){
    console.log("asd");
    
    this.nextClick.emit()
  }
  PreviosClick(): void {
this.previosClick.emit()
  }
  startClick(): void {
this.stratClick.emit()
  }
  EndClick(): void {
this.endClick.emit()
  }
}
