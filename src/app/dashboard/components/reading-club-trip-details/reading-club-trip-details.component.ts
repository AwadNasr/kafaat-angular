import { Component } from '@angular/core';
import { ReadingClubTripsService } from '../../services/reading-club-trips.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-reading-club-trip-details',
  templateUrl: './reading-club-trip-details.component.html',
  styleUrls: ['./reading-club-trip-details.component.css']
})
export class ReadingClubTripDetailsComponent {
  id:any;
  club:any;
  constructor(private service: MainDashoardService,
    private route: ActivatedRoute,private ReadingClubTripsService:ReadingClubTripsService,
   ) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
   ngOnInit() {
   this.loadReadingClubTrip();
}
loadReadingClubTrip(){
  this.ReadingClubTripsService.getById(this.id).subscribe({
    next:(res:ResponseVM)=>{
      if(res.statusCode==200){
        this.club = res.data
      }else{
        this.service.toastService.error(res.message);
      }
    }
  });
}
}
