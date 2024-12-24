import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-carousal-angle',
  templateUrl: './item-carousal-angle.component.html',
  styleUrls: ['./item-carousal-angle.component.css']
})
export class ItemCarousalAngleComponent {
  @Input() imgPath:String="";
}
