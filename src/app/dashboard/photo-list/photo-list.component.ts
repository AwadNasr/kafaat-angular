import { Component } from '@angular/core';
import { PhotosService } from '../services/photos.service';
import { Router } from '@angular/router';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../services/main-dashoard.service';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../components/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,id:0,name:''};
  constructor(public service:MainDashoardService , private router: Router ,
    private PhotosService:PhotosService){}
    ngOnInit(): void {
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
      this.PhotosService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;
        }
      });
    }
    addItem(): void {
      const dialogRef = this.service.dialog.open(AddPhotoComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        height:'95vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    editItem(id:any){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(AddPhotoComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:element,
        height:'95vh'
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
          title:'حذف الالبوم',
          label:'اسم الالبوم',
          submit:()=>{
            this.PhotosService.delete(element.id).pipe(
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
    openPhotoAlbum(id:any){
      console.log(id);

      this.router.navigate(['/admin/album-photos', id]);
      // const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      // const dialogRef = this.service.dialog.open(ArticleDetailsComponent, {
      //   width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      //   data:element,
      //   height:'95vh'
      // });
      // dialogRef.afterClosed().subscribe(result => {
      //   this.getPage();
      // });
    }
}
