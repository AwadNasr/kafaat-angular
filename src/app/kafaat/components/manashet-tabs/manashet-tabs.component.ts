import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-manashet-tabs',
  templateUrl: './manashet-tabs.component.html',
  styleUrls: ['./manashet-tabs.component.css']
})
export class ManashetTabsComponent {
  @Output() tabSelected: EventEmitter<number> = new EventEmitter<number>();
  indexSelected=0
  onTap(index:number):void{
    this.indexSelected=index;
    this.tabSelected.emit(index);
  }
}
