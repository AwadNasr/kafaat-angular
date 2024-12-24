import { Component } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';

@Component({
  selector: 'app-profile-achievements',
  templateUrl: './profile-achievements.component.html',
  styleUrls: ['./profile-achievements.component.css']
})
export class ProfileAchievementsComponent {
  // hideTest:boolean = true;
  /**
   *
   */
  constructor(private service:KafaatMainService) {
    
  }
  navList:any[]=[];
  items:any[]
  filterItems:any[]
  isDropDownVisible:boolean=false;
  isDropDownOptionsVisible:boolean=false;


  ngOnInit(): void {
    //this.fillNavList();
    // this.hideTest = true;
    this.loadData()
  }

  loadData(){
    this.service.programService.geAll().subscribe(res=>{
      this.navList=res.data;
      this.navList[0].isSelected=true;
      this.service.activityParticipantsService.getActivitiesParticipants(this.service.authService.currentUser().id)
      .subscribe(res=>{
        this.items=res.data
        this.filterItems=this.items.filter(x=>x.programName==this.navList[0].title)
      })
    })
  }

  selectItem(id:any){
    console.log(this.items);
    
    if(id==0){
      this.filterItems=this.items;
      return; 
    }
    this.navList.map(x=>x.programId==id?x.isSelected=true:x.isSelected=false);
    this.filterItems=this.items.filter(x=>x.programId==id)
    // if(id==7){
    //   this.isDropDownOptionsVisible=!this.isDropDownOptionsVisible;
    // }
  }
 
  // toggleOptions(){
  //   this.isDropDownVisible = !this.isDropDownVisible;
  // }
}
