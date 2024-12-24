import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from 'src/app/dashboard/services/programs.service';
import { ReadingClubService } from 'src/app/dashboard/services/reading-club.service';
import { JoinClubComponent } from 'src/app/kafaat/components/join-club/join-club.component';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';

@Component({
  selector: 'app-reading-club-section',
  templateUrl: './reading-club-section.component.html',
  styleUrls: ['./reading-club-section.component.css']
})
export class ReadingClubSectionComponent  implements OnInit {
  //pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  tabNumberIsActive:number = 0;
  windowWidth: number = 0;
  navList:any[];
  allClubs:any[];
  constructor(private route:ActivatedRoute,private service:ReadingClubService,private router:Router,public dialog: MatDialog) {

  }
  ngOnInit(): void {
   this.getPage();

  }
  getPage(){
    this.service.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.allClubs = res.items;
          this.navList = [];
          for (let i = 0; i < this.allClubs.length; i++) {
            this.navList.push({
              id: this.allClubs[i].id,
              label: this.allClubs[i].title,
              desc:this.allClubs[i].description,
              isSelected: i === 0,
            });
          }
          console.log(this.navList);

      }
    });
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
  }
  joinClub(id:any){
    console.log(id);
    const dialogRef = this.dialog.open(JoinClubComponent, {
      width:this.windowWidth<767?'70%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:id,
      }

    });
  }
  naviagteToDetails(id:any){
    this.router.navigate(['/kafaat/club-detailsBook', id]);
  }

}
