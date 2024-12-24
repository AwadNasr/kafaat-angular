import { Component, OnInit,AfterViewInit, HostListener } from '@angular/core';
import { UserProfilePopUpComponent } from 'src/app/dashboard/components/user-profile-pop-up/user-profile-pop-up.component';
import { UserData } from 'src/app/kafaat/core/models/UserData';
import { AuthService } from 'src/app/kafaat/services/auth.service';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit, AfterViewInit {
  user:UserData = {} as UserData;
  windowWidth:number = 0;
  apiURL:string = environment.baseApiUrl;
  userProfileImage:any;
  constructor(private service:KafaatMainService){}
  ngAfterViewInit(): void {
    this.getCurrentUSer();
      this.windowWidth = window.innerWidth;
  }
  ngOnInit(): void {
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }
  getCurrentUSer(){
    this.user = this.service.authService.currentUser();
    if(this.user.userImage.includes("assets/male.png")){
      this.userProfileImage = '/assets/images/male.png'
    }else if(this.user.userImage.includes("assets/female.png")){
      this.userProfileImage= '/assets/images/female.png'
    }
    else{
      this.userProfileImage = this.user.userImage;
    }
  }
  logout(){
    this.service.authService.logout();
  }
  viewMyProfile(){
    let _user = this.service.authService.currentUser();
    // const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(UserProfilePopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:{
        email:_user.email,
      }
    });
  }

  isSidebarActive = false;
  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

}
