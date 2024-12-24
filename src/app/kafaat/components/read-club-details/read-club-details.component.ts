import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { AuthService } from '../../services/auth.service';
import { ReadClubService } from 'src/app/dashboard/services/read-club.service';
import { ReadingClubTripsService } from 'src/app/dashboard/services/reading-club-trips.service';
import { PagedRequest } from '../../core/models/paged-request';

@Component({
  selector: 'app-read-club-details',
  templateUrl: './read-club-details.component.html',
  styleUrls: ['./read-club-details.component.css']
})
export class ReadClubDetailsComponent {
  readClub:any;
  id:any
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  readClubTrips:any
  constructor(public service:MainDashoardService,private router: Router,private ReadClubService:ReadClubService
    ,private authService:AuthService,private route: ActivatedRoute,private ReadingClubTripsService:ReadingClubTripsService
  ) {
     this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.pagedRequest.id=this.id;
      this.loadReadClub();
      this.loadReadiclubTrip()
    }
    loadReadClub(){
        this.ReadClubService.getById(this.id).subscribe({
          next:(res:any)=>{
              this.readClub = res.data;
          }
        });
    }
    loadReadiclubTrip(){
      this.ReadingClubTripsService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.readClubTrips = res.items;
        }
      });
  }
}
