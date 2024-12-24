import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-excellence-program',
  templateUrl: './excellence-program.component.html',
  styleUrls: ['./excellence-program.component.css']
})
export class ExcellenceProgramComponent {
  sharedId: number = 0;
  constructor(){
  }
  ngOnInit(){
      
  }

  handleValueFromChild(value: number) {
    // this.receivedValue = value;
    this.sharedId = value;
    console.log(value,"value");
    
  }
}
