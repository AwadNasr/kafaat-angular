import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header-labeled',
  templateUrl: './page-header-labeled.component.html',
  styleUrls: ['./page-header-labeled.component.css']
})
export class PageHeaderLabeledComponent {
  @Input() Header:string = ""; 
  @Input() Label:string = ""; 
}
