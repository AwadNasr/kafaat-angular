import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manashet-details-attachment-page',
  templateUrl: './manashet-details-attachment-page.component.html',
  styleUrls: ['./manashet-details-attachment-page.component.css']
})
export class ManashetDetailsAttachmentPageComponent {
  @Input() files:any[]=[]
  download(id:any){
    var item=this.files.find(x=>x.id==id)
    const link = document.createElement('a');
    link.href = item.path;
    link.download = item.title; 
    link.click();
    
  }
}
