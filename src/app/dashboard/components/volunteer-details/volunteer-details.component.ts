import { Component } from '@angular/core';
import { VolunteerFieldService } from '../../services/volunteer-field.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { VolunteerService } from '../../services/volunteer.service';

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.css']
})
export class VolunteerDetailsComponent {
  volunteerField:any;
  id:number;
  imgSrc:string
  constructor(public VolunteerService:VolunteerService,
    private service: MainDashoardService, private route: ActivatedRoute,
  ){

      this.route.params.subscribe(params => {
        this.id = params['id'];

      });

    }
    ngOnInit(): void {
      this.loadData();

    }
    baseImageUrl:string='https://back.kftalmajed.com/'
  loadData(){
    this.VolunteerService.getById(this.id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
      this.volunteerField=res.data;
      this.imgSrc=this.baseImageUrl+this.volunteerField.image;
        }else{
          this.service.toastService.error(res.message);
        }
      },
      error:(error: { error: string; })=>{
        this.service.toastService.error(error.error);
      }
    })
  }
}
