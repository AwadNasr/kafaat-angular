import { Component } from '@angular/core';

@Component({
  selector: 'app-manshat-details-in-progress',
  templateUrl: './manshat-details-in-progress.component.html',
  styleUrls: ['../manshat-details/manshat-details.component.css','./manshat-details-in-progress.component.css']
})
export class ManshatDetailsInProgressComponent {
  isAlertShown:boolean;
  constructor(){
    this.isAlertShown = true;
  }
  hideAlert(){
    this.isAlertShown = false;
  }
}
