import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manashet-item',
  templateUrl: './manashet-item.component.html',
  styleUrls: ['./manashet-item.component.css']
})
export class ManashetItemComponent {
  @Input() title:string=''
  @Input() description:String=''
  @Input() imagePath:String=''
  @Input() statusActivity:number=-1
  @Input() programTitle:string=''
  @Input() circle:boolean=false

  isMoreReadEnabled:boolean=true;
}
