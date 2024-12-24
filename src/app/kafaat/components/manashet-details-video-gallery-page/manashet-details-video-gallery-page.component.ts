import { Component, Input, ViewChild } from '@angular/core';
import { DialogVideoImageComponent } from 'src/app/shared/components/dialog-video-image/dialog-video-image.component';

@Component({
  selector: 'app-manashet-details-video-gallery-page',
  templateUrl: './manashet-details-video-gallery-page.component.html',
  styleUrls: ['./manashet-details-video-gallery-page.component.css']
})
export class ManashetDetailsVideoGalleryPageComponent {
  @Input() items:any[]=[]
  @ViewChild('dialog', { static: false }) dialogComponent: DialogVideoImageComponent | undefined;
  openModal(path:any){
    console.log(this.dialogComponent)
    if (this.dialogComponent) {
      this.dialogComponent.openVideo(path);
    }
  }
}
