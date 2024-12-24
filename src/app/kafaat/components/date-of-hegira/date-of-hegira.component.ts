import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-date-of-hegira',
  templateUrl: './date-of-hegira.component.html',
  styleUrls: ['./date-of-hegira.component.css']
})
export class DateOfHegiraComponent {
  public dateMoment: moment.Moment;
 
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());
  constructor() {
  
  }
}
