import { AfterViewInit, OnInit,Component, Input } from '@angular/core';

@Component({
  selector: 'app-masked-image',
  templateUrl: './masked-image.component.html',
  styleUrls: ['./masked-image.component.css']
})
export class MaskedImageComponent implements OnInit,  AfterViewInit {
  imageUrl:string = '/assets/images/person.png';
  styles:any;
  width:number = 0;
  height:number = 0;
  @Input() inputImageUrl: string;
  @Input() inputWidth: number;
  @Input() inputHeight: number;

  ngOnInit(): void {
    this.imageUrl = this.inputImageUrl;
    this.width = this.inputWidth;
    this.height = this.inputHeight;
    this.styles = {
      width: this.width+'px',
      height: this.height+'px',
    };
  }  
  ngAfterViewInit(): void {
    this.imageUrl = this.inputImageUrl;
    this.width = this.inputWidth;
    this.height = this.inputHeight;

    this.styles = {
      width: this.width+'px',
      height: this.height+'px',
    };
  }
  

}
