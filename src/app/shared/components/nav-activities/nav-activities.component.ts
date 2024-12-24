import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';

@Component({
  selector: 'app-nav-activities',
  templateUrl: './nav-activities.component.html',
  styleUrls: ['./nav-activities.component.css']
})
export class NavActivitiesComponent implements OnInit,AfterViewInit {
  @Input() programId:number=0;
  @Output() numberSelected = new EventEmitter<number>();
  items:any[]=[]
  itemsDisplay:any[]=[{name:'كل البرامج',id:0,isSelected:true}]
  isDropDownVisible:boolean
  constructor(private service:KafaatMainService) {


  }
  ngAfterViewInit(): void {
    window.onclick=(event)=>{
     if(event.target!=document.getElementById('open')){
       this.isDropDownVisible=false;
     }
    }
   }
  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.service.programService.getActivities(this.programId).subscribe(response=>{
      if(response.statusCode=='200'){
        this.items=response.data
        var length=this.items.length>5?5:this.items.length
          for(var i=0;i<length;i++){
            this.itemsDisplay.push(this.items.pop())
        }
        // if(this.items.length>0)
        // this.itemsDisplay.push({name:'المزيد',id:-1})
      }
    })
  }

  index:number=0;
  onTap(index:number):void{
    if(index!=-1){
      console.log(index);
      this.numberSelected.emit(index);
    this.index=index;
    this.itemsDisplay.forEach(e=>e.isSelected=false)
    this.itemsDisplay.find(x=>x.id==index).isSelected=true

    }else{
      this.isDropDownVisible=!this.isDropDownVisible
    }
  }

}
