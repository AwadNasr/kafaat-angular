import { AfterViewInit, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.css']
})
export class EmptyDataComponent implements AfterViewInit {
  emptyText:string = "لا يوجد بيانات لعرضــها";
  @Input() inputText: string;
  
  ngAfterViewInit(): void {
    this.emptyText = this.inputText;
  }
}
