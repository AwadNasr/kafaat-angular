import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-third',
  templateUrl: './image-third.component.html',
  styleUrls: ['./image-third.component.css']
})
export class ImageThirdComponent {
  @Input() img1:String='';
  @Input() img2:String='';
  @Input() img3:String='';
  
}
