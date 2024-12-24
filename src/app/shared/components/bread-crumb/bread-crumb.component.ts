import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent {
@Input() title:string=''
@Input() titleRouteLink:string=''
@Input() subTitles:string=''
@Input() subTitlesRouteLink:string=''
@Input() subSubTitle:string=''
@Input() subSubTitleRouteLink:string=''
@Input() subSubSubTitle:string=''
@Input() subSubSubTitleRouteLink:string=''
}
