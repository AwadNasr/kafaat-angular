import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-to-back-header',
  templateUrl: './navigation-to-back-header.component.html',
  styleUrls: ['./navigation-to-back-header.component.css']
})
export class NavigationToBackHeaderComponent  {
  @Input() statusActivity:number=-1
  constructor(private location:Location){}
  back(){
    this.location.back();
  }
  @Input() Title:string = ""; 
}
