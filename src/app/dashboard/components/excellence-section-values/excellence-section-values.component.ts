import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddExcellenceSectionComponent } from '../add-excellence-section/add-excellence-section.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { ExcellenceSectionValuesService } from '../../services/excellence-section-values.service';
import { ExcellenceContentValuesComponent } from '../excellence-content-values/excellence-content-values.component';
@Component({
  selector: 'app-excellence-section-values',
  templateUrl: './excellence-section-values.component.html',
  styleUrls: ['./excellence-section-values.component.css']
})
export class ExcellenceSectionValuesComponent {
  windowWidth: number = 0;
  id:any
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(public service:MainDashoardService,private router: Router,private ExcellenceSectionValuesService:ExcellenceSectionValuesService
    ,private route: ActivatedRoute
  ) {
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
      this.ExcellenceSectionValuesService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;
        }
      });
    }
    deleteItem(id:number){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:{
          id:element.id,
          name:element.title,
          title:'حذف القسم',
          label:'اسم القسم ',
          submit:()=>{
            this.ExcellenceSectionValuesService.delete(element.id).pipe(
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
    addItem(): void {
      const dialogRef = this.service.dialog.open(ExcellenceContentValuesComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        height:'70vh',
        data:this.id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    editItem(id:any){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(ExcellenceContentValuesComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:element,
        height:'70vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    openSection(id:any){
      this.router.navigate(['/admin/excellence-content-values', id]);
    }
}
