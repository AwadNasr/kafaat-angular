import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MatNativeDateModule, ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-date-of-birth',
  templateUrl: './date-of-birth.component.html',
  styleUrls: ['./date-of-birth.component.css'],
})
export class DateOfBirthComponent {
constructor(private dateProvider:DateAdapter<Date>) {
  dateProvider.setLocale('ar-sa')
}
}
