import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-device',
  templateUrl: './header-device.component.html',
  styleUrls: ['./header-device.component.css']
})
export class HeaderDeviceComponent {

  @Input() imgPath='';
}
