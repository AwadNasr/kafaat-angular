import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent {
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
