import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PagedRequest } from '../../core/models/paged-request';
import { VolunteerService } from 'src/app/dashboard/services/volunteer.service';
import { environment } from 'src/environments/environment.prod';
import { VolunteerReportService } from 'src/app/dashboard/services/volunteer-report.service';

@Component({
  selector: 'app-volunteer-details',
  templateUrl: './volunteer-details.component.html',
  styleUrls: ['./volunteer-details.component.css']
})
export class VolunteerDetailsComponent {
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:50,name:''};
  volunteer:any;
  volunteerFields:any
  volunteers:any
  id:any;
  report:any;
  constructor(public service:MainDashoardService,private router: Router,private VolunteerService:VolunteerService
,private route: ActivatedRoute,private VolunteerReportService:VolunteerReportService
  ) {
     this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }
  // ngOnInit(): void {
  //   this.pagedRequest.id=0;
  //     this.loadVolunteer();
  //     this.loadReport();
  //   }
  //   loadVolunteer(){
  //       this.VolunteerService.getPage(this.pagedRequest).subscribe({
  //         next:(res:any)=>{
  //             this.volunteer = res.items[0];
  //             this.id=this.volunteer.id;
  //             this.volunteerFields=res.items[0].volunteerFields;
  //             this.volunteers=res.items.slice(1);

  //         }
  //       });
  //   }
  //   loadReport(){
  //     this.VolunteerReportService.getById(this.id).subscribe({
  //       next:(res:any)=>{
  //          this.report-res.data;
  //       }
  //     });
  // }
  ngOnInit(): void {
    this.pagedRequest.id = this.id;
    this.loadVolunteerAndReport();
    this.getAll();
}

loadVolunteerAndReport(): void {
    this.VolunteerService.getPage(this.pagedRequest).subscribe({
        next: (res: any) => {
            this.volunteer = res.items[0];
           // this.id = this.volunteer.id;
            this.volunteerFields = this.volunteer.volunteerFields;
           // this.volunteers = res.items.slice(1);


            this.loadReport();
        },
        error: (err) => {
            console.error("Error loading volunteer data:", err);
        }
    });
}
getAll(): void {
  this.VolunteerService.getAll(this.id).subscribe({
      next: (res: any) => {
          this.volunteers = res.data;
      }
  });
}

loadReport(): void {
    if (!this.id) {
        console.warn("No ID available to load report.");
        return;
    }

    this.VolunteerReportService.getById(this.id).subscribe({
        next: (res: any) => {
            this.report = res.data;
        },
        error: (err) => {
            console.error("Error loading report:", err);
        }
    });
}
  goToLink(url: string){
    url = environment.baseImageUrl + url
    window.open(url, "_blank");
}
navigateToParticipant(userId:string){
  this.router.navigate(['/kafaat/volunteer-details', userId]);
}
}
