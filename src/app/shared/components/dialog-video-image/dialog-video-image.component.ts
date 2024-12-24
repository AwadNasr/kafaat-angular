import { Component, Input, Renderer2 } from '@angular/core';
import * as URLParse from 'url-parse';
@Component({
  selector: 'app-dialog-video-image',
  templateUrl: './dialog-video-image.component.html',
  styleUrls: ['./dialog-video-image.component.css']
})
export class DialogVideoImageComponent {
  /**
   *
   */
  constructor(private renderer:Renderer2) {
    
    
  }
  
  videoContainer:any
  iframe:any
   modalImageSrc:string=''
 videoSource:string='';
  modalVisible: boolean = false;
  openImage(source:string) {
    this.modalImageSrc=source;
    this.videoSource='';
    this.modalVisible = true;
  }

  openVideo(source:string) {
    this.videoSource='https://www.youtube.com/embed/'+this.getYouTubeVideoId(source);
    this.modalImageSrc='';
    this.modalVisible = true;
    console.log(this.videoSource);
    

   setTimeout(()=>{
     this.videoContainer = document.getElementById('div-video');
    if (this.videoContainer) {
      
       this.iframe = this.renderer.createElement('iframe');
      this.renderer.setAttribute(this.iframe, 'width', '100%');
      this.renderer.setAttribute(this.iframe, 'height', '100%');
      this.renderer.setAttribute(
        this.iframe,
        'src',
        'https://www.youtube.com/embed/'+this.getYouTubeVideoId(source)
      );
      this.renderer.setAttribute(this.iframe, 'title', 'YouTube video player');
      this.renderer.setAttribute(this.iframe, 'frameborder', '0');
      this.renderer.setAttribute(
        this.iframe,
        'allow',
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      );
      this.renderer.setAttribute(this.iframe, 'allowfullscreen', '');

      this.renderer.appendChild(this.videoContainer, this.iframe);
    }
   },500)
  
  }
  getYouTubeVideoId(url: string){
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);

    if (match && match[1]) {
      return  match[1];
    } else {
     return 'Invalid YouTube link';
    }
  }

  closeModal() {
    this.modalVisible = false;
    this.renderer.removeChild(this.videoContainer, this.iframe);
  }
}
