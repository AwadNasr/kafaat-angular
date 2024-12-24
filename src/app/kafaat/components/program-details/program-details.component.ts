import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from '../../services/programs.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit {
  tabNumberIsActive:number = 0;
  navList:any[]=[];
  id:any
  objectives=false;
  program:any
  allActivities:any[]=[]
  pastActivity:any[]=[]
  nextActivity:any[]=[]
  underwayActivity:any[]=[]
  constructor(private route:ActivatedRoute,private service:ProgramsService,private router:Router) {
    this.route.params.subscribe(value=>{
      this.id=value['id']
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.fillNavList();
    this.loadProgram()
  }
  loadProgram(){
    this.service.getById(this.id).subscribe(response=>{
      if(response.statusCode=='200'){
        this.program=response.data

        this.allActivities=response.data.activities
        this.pastActivity=this.allActivities.filter(a=>a.statusActivity==2);
        this.underwayActivity=this.allActivities.filter(a=>a.statusActivity==0);
        this.nextActivity=this.allActivities.filter(a=>a.statusActivity==1);
      }
      console.log(response.data)
    })
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
  }
  fillNavList(){
    this.navList = [
      {id:1,label:'جميع المناشط',isSelected:false},
      {id:2,label:'القادمة',isSelected:true},
      {id:3,label:'الحالية',isSelected:false},
      {id:4,label:'السابقة',isSelected:false},
    ];
  }
  onTabSelected(index:any){
    this.tabNumberIsActive = index;
  }

  onClickItem(id:number){
    this.router.navigate(['/kafaat/activity-details/',id])
  }

  changeObjective(){
    this.objectives=!this.objectives;
  }
}
