import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() imgPath='';
constructor(private http: HttpClient) {
  
}

  async imageToBase64(imageUrl: string): Promise<string> {
    try {
      const response = await this.http.get(imageUrl, { responseType: 'arraybuffer' }).toPromise();
      const bytes = new Uint8Array(response);
      const base64String = btoa(String.fromCharCode(...bytes));
      return base64String;
    } catch (error) {
      console.error('Failed to load image', error);
      throw error;
    }
  }

  async loadImageAndConvertToBase64() {

    try {
      const base64String = await this.imageToBase64(this.imgPath);
      console.log('Base64 encoded image:', base64String);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}