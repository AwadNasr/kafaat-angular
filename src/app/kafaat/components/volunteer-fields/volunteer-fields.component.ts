import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { VolunteeerFieldService } from 'src/app/dashboard/services/volunteeer-field.service';
import { PagedRequest } from '../../core/models/paged-request';
import { VolunteerService } from 'src/app/dashboard/services/volunteer.service';
import { JoinVolunteerFieldComponent } from '../join-volunteer-field/join-volunteer-field.component';
import { VolunteerConditionsService } from 'src/app/dashboard/services/volunteer-conditions.service';

@Component({
  selector: 'app-volunteer-fields',
  templateUrl: './volunteer-fields.component.html',
  styleUrls: ['./volunteer-fields.component.css']
})
export class VolunteerFieldsComponent {
  id:any
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  pagedRequest1:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  volunteerFields:any
  volunteers:any
  conditions:any
  constructor(public service:MainDashoardService,private router: Router,private VolunteeerFieldService:VolunteeerFieldService
    ,private route: ActivatedRoute,private VolunteerService:VolunteerService,private VolunteerConditionsService:VolunteerConditionsService
      ) {
         this.route.params.subscribe(params => {
          this.id = params['id'];
        });
      }
      ngOnInit(): void {
        this.pagedRequest.id=this.id;
        this.pagedRequest1.id=0;
          this.loadVolunteerField();
          //this.loadVolunteer();
          this.loadConditions();
          this.getAll();
        }
        loadVolunteerField(){
            this.VolunteeerFieldService.getPageOpen(this.pagedRequest).subscribe({
              next:(res:any)=>{
                   this.volunteerFields = res.items;

              }
            });
        }
      //   loadVolunteer(){
      //     this.VolunteerService.getPage(this.pagedRequest1).subscribe({
      //       next:(res:any)=>{
      //         this.volunteers = res.items;
      //       }
      //     });
      // }
      loadConditions(){
        this.VolunteerConditionsService.getAll(this.id).subscribe({
          next:(res:any)=>{
            this.conditions = res.data;
          }
        });
    }
      windowWidth: number = 0;
  join(id:any){
    const dialogRef = this.service.dialog.open(JoinVolunteerFieldComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:id,
      height:'40vh'
    });
  }
  getAll() {
    this.VolunteerService.getAll(this.id).subscribe({
        next: (res: any) => {
            this.volunteers = res.data;
        }
    });
}
}
