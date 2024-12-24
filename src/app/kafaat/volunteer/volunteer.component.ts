import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { VolunteerService } from 'src/app/dashboard/services/volunteer.service';
import { PagedRequest } from '../core/models/paged-request';
import { VolunteerFieldService } from 'src/app/dashboard/services/volunteer-field.service';
import { VolunteeerFieldService } from 'src/app/dashboard/services/volunteeer-field.service';
import { PagedResponse } from '../core/models/paged-response';
import { StrategicObjectivesService } from 'src/app/dashboard/services/strategic-objectives.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent {
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  pagedRequest1:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  volunteer:any;
  volunteerFields:any
  volunteers:any
  id:any
  currentVolunteerId: number;
  constructor(public service:MainDashoardService,private router: Router,private VolunteerService:VolunteerService
    ,private VolunteeerFieldService:VolunteeerFieldService ,private StrategicObjectivesService:StrategicObjectivesService
,private route: ActivatedRoute
  ) {
     this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.pagedRequest.id=0;
      this.loadVolunteer();
      this.getAllObjectives();
      this.getSitePhotosFromLocalStorage();


    }
    loadVolunteer(){
      if (!isNaN(this.id)){
        this.pagedRequest.id=this.id;
        this.VolunteerService.getPage(this.pagedRequest).subscribe({
          next:(res:any)=>{
              this.volunteer = res.items[0];
              this.currentVolunteerId=this.id;
             this.volunteers=res.items.slice(1);
               this.getAll();
               this.loadVolunteerFields();
          }
        });
      }else{
        this.VolunteerService.getPage(this.pagedRequest).subscribe({
          next:(res:any)=>{
              this.volunteer = res.items[0];
              this.currentVolunteerId=this.volunteer.id;
               this.getAll();
               this.loadVolunteerFields();

          }
        });
      }


    }

    getAll() {
      this.VolunteerService.getAll(this.currentVolunteerId).subscribe({
          next: (res: any) => {
              this.volunteers = res.data;
          }
      });
  }
  objectives:any
  getAllObjectives() {
    this.StrategicObjectivesService.getAll().subscribe({
        next: (res: any) => {
            this.objectives = res.data;
        }
    });
}
  loadVolunteerFields(){
    this.pagedRequest1.id=this.currentVolunteerId;
    this.VolunteeerFieldService.getPageClose(this.pagedRequest1).subscribe({
      next:(res:any)=>{
         this.volunteerFields=res.items;

      }
    });
  }
  navigateToParticipant(userId:string){
    this.router.navigate(['/kafaat/volunteer-details', userId]);
  }
  photos:any
  getSitePhotosFromLocalStorage(){
    const storedPhotos = localStorage.getItem('sitePhotos');
    if (storedPhotos) {
      this.photos = JSON.parse(storedPhotos);
      console.log(this.photos);

    } else {
      this.photos = [];
      console.log(this.photos);
    }
  }
}
