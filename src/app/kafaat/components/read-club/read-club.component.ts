import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ReadClubService } from 'src/app/dashboard/services/read-club.service';
import { PagedRequest } from '../../core/models/paged-request';
import { AuthService } from '../../services/auth.service';
import { JoinReadClubComponent } from '../join-read-club/join-read-club.component';

@Component({
  selector: 'app-read-club',
  templateUrl: './read-club.component.html',
  styleUrls: ['./read-club.component.css']
})
export class ReadClubComponent {
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  readClub:any;
  readClubs:any
  constructor(public service:MainDashoardService,private router: Router,private ReadClubService:ReadClubService
    ,private authService:AuthService,private route: ActivatedRoute
  ) {
    //  this.route.params.subscribe(params => {
    //   this.id = params['id'];

    // });
  }
  ngOnInit(): void {
    this.pagedRequest.id=0;
      this.loadExcellencePrize();
      this.getSitePhotosFromLocalStorage();
    }
    loadExcellencePrize(){
        this.ReadClubService.getPage(this.pagedRequest).subscribe({
          next:(res:any)=>{
              this.readClub = res.items[0];
              this.readClubs=res.items;
          }
        });
    }
    windowWidth: number = 0;
  join(id:any){
    const dialogRef = this.service.dialog.open(JoinReadClubComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:id,
      height:'40vh'
    });
  }
  photos:any
  getSitePhotosFromLocalStorage(){
    const storedPhotos = localStorage.getItem('sitePhotos');
    if (storedPhotos) {
      this.photos = JSON.parse(storedPhotos);
    } else {
      this.photos = [];
    }
  }
}
