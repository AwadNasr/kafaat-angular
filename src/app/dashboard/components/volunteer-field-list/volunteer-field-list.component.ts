import { Component } from '@angular/core';
import { VolunteerFieldService } from '../../services/volunteer-field.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddVolunteerFieldComponent } from '../add-volunteer-field/add-volunteer-field.component';
import { VolunteerService } from '../../services/volunteer.service';
import { VolunteeerFieldService } from '../../services/volunteeer-field.service';
import { AddParticipantVolunteerComponent } from '../add-participant-volunteer/add-participant-volunteer.component';

@Component({
  selector: 'app-volunteer-field-list',
  templateUrl: './volunteer-field-list.component.html',
  styleUrls: ['./volunteer-field-list.component.css']
})
export class VolunteerFieldListComponent {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  id:any
  constructor(public service:MainDashoardService,private router: Router
    ,private VolunteeerFieldService:VolunteeerFieldService, private route: ActivatedRoute) {
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
      this.VolunteeerFieldService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;

        }
      });
    }
    changeSelect(event:any){
      this.pagedRequest.id=event.value;
      this.pagedRequest.pageNumber=1;
      this.getPage();
    }
    addItem(): void {
      const dialogRef = this.service.dialog.open(AddVolunteerFieldComponent, {
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
          title:'حذف مجال التطوع',
          label:'اسم المجال',
          submit:()=>{
            this.VolunteeerFieldService.delete(element.id).pipe(
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
      const dialogRef = this.service.dialog.open(AddVolunteerFieldComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:element,
        height:'95vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    openField(id:any){
      this.router.navigate(['/admin/volunteer-field-details', id]);
    }
    addUserToVolunteer(id:any){
      const dialogRef = this.service.dialog.open(AddParticipantVolunteerComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
        data:
          id
      })
    }
    onAvailabilityChange(Id: any, approvalStatus: string): void {
      const isOpen = approvalStatus === 'true';
      const participant = this.pageResponse.items.find((p:any) => p.id === Id);
  if(isOpen==true)  {
  this.open(Id);
  }else{
  this.close(Id);
  }
    }
    open(Id:string){
      this.VolunteeerFieldService.open({volunteerFieldId:Id}).subscribe(response=>{
        if(response.statusCode=='200'){
        this.service.toastService.success(response.message);
        const participant = this.pageResponse.items.find((p:any) => p.id === Id);
        }else{
          this.service.toastService.error(response.message);
        }
      })
    }
    close(Id:string){
      this.VolunteeerFieldService.close({volunteerFieldId:Id}).subscribe(response=>{
        if(response.statusCode=='200'){
        this.service.toastService.success(response.message);
       // this.getPage();
       const participant = this.pageResponse.items.find((p:any) => p.id === Id);
          // if (participant) {
          //   participant.isDisapproved = true;
          // }

        }else{
          this.service.toastService.error(response.message);
        }
      })
    }
}
