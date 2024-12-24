import { Component } from '@angular/core';

@Component({
  selector: 'app-display-content',
  templateUrl: './display-content.component.html',
  styleUrls: ['./display-content.component.css']
})
export class DisplayContentComponent {
  ngOnInit(): void {
      this.getSitePhotosFromLocalStorage();
    }
  photos:any
  getSitePhotosFromLocalStorage(){
    const storedPhotos = localStorage.getItem('sitePhotos');
    if (storedPhotos) {
      this.photos = JSON.parse(storedPhotos);
      console.log(this.photos);

    } else {
      this.photos = [];
      console.log(this.photos);
    }
  }
}
