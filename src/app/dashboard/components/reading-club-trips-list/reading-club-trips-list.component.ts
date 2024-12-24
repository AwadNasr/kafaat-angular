import { Component } from '@angular/core';
import { ReadingClubTripsService } from '../../services/reading-club-trips.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddReadClubComponent } from '../add-read-club/add-read-club.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddReadingClubTripComponent } from '../add-reading-club-trip/add-reading-club-trip.component';
import { AddParticipantClubComponent } from '../add-participant-club/add-participant-club.component';

@Component({
  selector: 'app-reading-club-trips-list',
  templateUrl: './reading-club-trips-list.component.html',
  styleUrls: ['./reading-club-trips-list.component.css']
})
export class ReadingClubTripsListComponent {
  windowWidth: number = 0;
id:any
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};

  constructor(public service:MainDashoardService,private router: Router,private ReadingClubTripsService:ReadingClubTripsService,private route: ActivatedRoute) {
     this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
  this.pagedRequest.id=this.id;
    this.getPage();

  }
  getPageByName(){
    this.getPage();
  }

  changePageSize(){
    this.pagedRequest.pageNumber = 1;
    this.getPage();
  }
  changePageNumber(event:any){
    this.pagedRequest.pageNumber = event;
    this.getPage();
  }
  getPage(){
    this.ReadingClubTripsService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddReadingClubTripComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      height:'95vh',
      data:this.id
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  deleteItem(id:number){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.title,
        title:'حذف نادي القراءة',
        label:'اسم النادي',
        submit:()=>{
          this.ReadingClubTripsService.delete(element.id).pipe(
            catchError((error) => {
              console.error(error);
              this.service.toastService.error('افحص السيرفر');
              return throwError(error);
            })
          ).subscribe((response) => {
            if(response.statusCode=="200"){
              this.service.toastService.success(response.message)
              this.getPage();
            }else{
              this.service.toastService.error(response.message);
            }
          });
        }
        ,
        fun:()=>{
           this.getPage();
        }
      },
    });
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(AddReadingClubTripComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'95vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  openClub(id:any){
    this.router.navigate(['/admin/reading-club-trip-details', id]);
  }
  addUserToClub(id:any){
    const dialogRef = this.service.dialog.open(AddParticipantClubComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:
        id
    })
  }
}
