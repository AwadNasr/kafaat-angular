import { Component, Input, ViewChild } from '@angular/core';
import { DialogVideoImageComponent } from 'src/app/shared/components/dialog-video-image/dialog-video-image.component';

@Component({
  selector: 'app-manashet-details-image-gallery-page',
  templateUrl: './manashet-details-image-gallery-page.component.html',
  styleUrls: ['./manashet-details-image-gallery-page.component.css']
})
export class ManashetDetailsImageGalleryPageComponent {
  @Input() items:any=[]
  @ViewChild('dialog', { static: false }) dialogComponent: DialogVideoImageComponent | undefined;
  openModal(path:any){
   
    console.log(this.dialogComponent)
    if (this.dialogComponent) {
      this.dialogComponent.openImage(path);
    }
  }
}
