import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manashet-details-report-page',
  templateUrl: './manashet-details-report-page.component.html',
  styleUrls: ['./manashet-details-report-page.component.css']
})
export class ManashetDetailsReportPageComponent {
@Input() report:string=''
}
