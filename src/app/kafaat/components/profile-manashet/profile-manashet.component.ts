import { Component, OnInit } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-profile-manashet',
  templateUrl: './profile-manashet.component.html',
  styleUrls: ['./profile-manashet.component.css']
})
export class ProfileManashetComponent implements OnInit {

  currentActivities:any[]
  pastActivities:any[]
  willActivities:any[]
  allActivities:any[]
  constructor(private service:KafaatMainService) {


  }

  loadData(){
    this.service.activityService.getActivitiesParticipants(this.service.authService.currentUser().id).subscribe(res=>{
      this.allActivities=res.data;

      this.pastActivities=this.allActivities.filter(x=>x.statusActivity==2);
      this.hideTest=this.allActivities.length==0;
      this.willActivities=this.allActivities.filter(x=>x.statusActivity==1);
      this.currentActivities=this.allActivities.filter(x=>x.statusActivity==0);

    })
  }
  hideTest:boolean = null;
  navList:any[]=[];

  ngOnInit(): void {
    this.fillNavList();
    this.loadData();

  }

  selectItem(id:any){

    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
  }
  fillNavList(){
    this.navList = [
      {id:1,label:'جميع المناشط',isSelected:true},
      {id:2,label:'القادمة',isSelected:false},
      {id:3,label:'الحالية',isSelected:false},
      {id:4,label:'السابقة',isSelected:false},
    ];
  }
  gotoDetail(id:any){
    this.service.router.navigate(['/kafaat/activity-details',id])
  }

}
