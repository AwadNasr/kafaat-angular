import { Component } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';

@Component({
  selector: 'app-profile-musharakat',
  templateUrl: './profile-musharakat.component.html',
  styleUrls: ['./profile-musharakat.component.css']
})
export class ProfileMusharakatComponent {
  /**
   *
   */
  constructor(private service:KafaatMainService) {
  
  }
  // hideTest:boolean = true;
  navList:any[]=[];
  isDropDownVisible:boolean=false;
  isDropDownOptionsVisible:boolean=false;
  allPosts:any[]
  filterPosts:any[]

  ngOnInit(): void {
   // this.fillNavList();
    this.loadData()
    // this.hideTest = true;
  }

  loadData(){
    this.service.programService.geAll().subscribe(res=>{
      this.navList=res.data;
      this.navList[0].isSelected=true;
      this.service.postsActivity.getPostsParticipants(this.service.authService.currentUser().id).subscribe(res=>{
        this.allPosts=res.data
        this.filterPosts=this.allPosts.filter(x=>x.programName==this.navList[0].title);
      })
    })
   
  }

  selectItem(id:any){
    
    if(id==0){
      this.filterPosts=this.allPosts;
      return;
    }
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
    this.filterPosts=this.allPosts.filter(x=>x.id==id);
    // if(id==7){
    //   this.isDropDownOptionsVisible=!this.isDropDownOptionsVisible;
    // }
  }
  toggleOptions(){
    this.isDropDownVisible = !this.isDropDownVisible;
  }
}
