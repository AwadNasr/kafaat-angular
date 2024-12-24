import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-magazine-cart',
  templateUrl: './magazine-cart.component.html',
  styleUrls: ['./magazine-cart.component.css','../manashet-item/manashet-item.component.css']
})
export class MagazineCartComponent {
@Input() item:any
}
