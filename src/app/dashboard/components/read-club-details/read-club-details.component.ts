import { Component } from '@angular/core';
import { ReadClubService } from '../../services/read-club.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-read-club-details',
  templateUrl: './read-club-details.component.html',
  styleUrls: ['./read-club-details.component.css']
})
export class ReadClubDetailsComponent {
  id:any;
  club:any;
  constructor(private service: MainDashoardService,
    private route: ActivatedRoute,private ReadClubService:ReadClubService,
   ) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
   ngOnInit() {
   this.loadReadingClub();
}
loadReadingClub(){
  this.ReadClubService.getById(this.id).subscribe({
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
