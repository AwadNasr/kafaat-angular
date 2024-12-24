import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css']
})
export class AlbumCardComponent {
  @Input() item: any
  SubStringFun(str:any){
    if(str.length> 300){
      var a = str.split(' ')
      var sr = a.slice(0,25).join(' ')
      sr += "<label style='color: blue !important;'>...المزيد</label>"
    }

    return sr;
  }
}
