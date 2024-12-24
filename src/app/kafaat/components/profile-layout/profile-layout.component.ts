import { AfterViewInit, Component, OnInit } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileLogoutPopUpComponent } from '../profile-logout-pop-up/profile-logout-pop-up.component';
import { ProfileDeleteAccountPopUpComponent } from '../profile-delete-account-pop-up/profile-delete-account-pop-up.component';

@Component({
  selector: 'app-profile-layout',
  templateUrl: './profile-layout.component.html',
  styleUrls: ['./profile-layout.component.css']
})
export class ProfileLayoutComponent implements OnInit,AfterViewInit {
  navigationItemsList:any[]=[];
  windowWidth: number = 0;
  activities:any[]
constructor(private dialog:MatDialog) {
}
  sharedId: number;
  handleIdChange(newId: number) {
    this.sharedId = newId;
  }

  ngOnInit(): void {
    this.loadNavigationItemsList();
    this.windowWidth = window.innerWidth;
  }

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
    // alert(this.windowWidth);
  }

  loadNavigationItemsList(){
    this.navigationItemsList = [
      {id:1,label:'معلومات الحساب',url:'#',isSelected:true},
      {id:2,label:'المناشط',url:'#',isSelected:false},
      {id:3,label:'المدفوعات',url:'#',isSelected:false},
      {id:4,label:'المشاركات',url:'#',isSelected:false},
      {id:5,label:'الإنجازات',url:'#',isSelected:false},
      {id:6,label:'تسجيل الخروج',url:'#',isSelected:false},
      {id:7,label:'حذف الحساب',url:'#',isSelected:false},
    ];
  }
  chageNavigationLink(id:any){

    if(id==6){
      this.dialog.open(ProfileLogoutPopUpComponent,{
        width:this.windowWidth<767?'90%':(this.windowWidth<1300?'50%':'30%')
      })
    }else if(id==7){
      this.dialog.open(ProfileDeleteAccountPopUpComponent,{
        width:this.windowWidth<767?'90%':(this.windowWidth<1300?'50%':'30%')
      })
    }else{
      this.navigationItemsList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
    }
  }
}
