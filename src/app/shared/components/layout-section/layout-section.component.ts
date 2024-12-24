import { ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-layout-section',
  templateUrl: './layout-section.component.html',
  styleUrls: ['./layout-section.component.css']
})
export class LayoutSectionComponent {
  slidesLength:number=0;
  @Input() componentToDisplay: number=-1;
  @Input() title:string='';
  @Input() header='a'
  @Input() sharedId = 0;
  @Output() idChange2 : EventEmitter<number> = new EventEmitter<number>();
  constructor(private ngZone: NgZone,private changeDetectorRef: ChangeDetectorRef) { }
  // handleSlidesLength(data: number) {
  //   this.slidesLength = data;
  // }
  ngOnInit() {
    // console.log(this.sharedId,"sdasdas");
    console.log(this.idChange2,"sdasdas");
    
    
  }
  
  // handleIdChange(newId: number) {
  //   console.log('ID received in Parent Component:', newId);
  //   this.sharedId = newId;
  // }
  handleIdChange(newId: any) {
    // this.ngZone.run(() => {
      console.log('ID received in Parent Component:', newId); 
      this.changeDetectorRef.detectChanges();
      // this.sharedId = newId;
      this.idChange2.emit(newId);
      
      // console.log(this.sharedId);
      
    // });
    // this.ngOnInit();
  }
}
