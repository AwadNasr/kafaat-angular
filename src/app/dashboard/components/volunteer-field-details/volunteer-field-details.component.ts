import { Component } from '@angular/core';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { VolunteeerFieldService } from '../../services/volunteeer-field.service';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-volunteer-field-details',
  templateUrl: './volunteer-field-details.component.html',
  styleUrls: ['./volunteer-field-details.component.css']
})
export class VolunteerFieldDetailsComponent {
  volunteerField:any;
  id:number;
  imgSrc:string
  constructor(public VolunteeerFieldService:VolunteeerFieldService,
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
    this.VolunteeerFieldService.getById(this.id).subscribe({
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
