import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { AddPhotoComponent } from '../add-photo/add-photo.component';
import { DialogDeleteComponent } from '../components/dialog-delete/dialog-delete.component';
import { MainDashoardService } from '../services/main-dashoard.service';
import { VideosService } from '../services/videos.service';
import { AddVideoAlbumComponent } from '../add-video-album/add-video-album.component';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,id:0,name:''};
  constructor(public service:MainDashoardService , private router: Router ,
    private VideosService:VideosService){}
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
      this.VideosService.getPage(this.pagedRequest).subscribe({
        next:(res:PagedResponse)=>{
            this.pageResponse = res;
        }
      });
    }
    addItem(): void {
      const dialogRef = this.service.dialog.open(AddVideoAlbumComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        height:'95vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    editItem(id:any){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(AddVideoAlbumComponent, {
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
            this.VideosService.delete(element.id).pipe(
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
    openVideoAlbum(id:any){
      this.router.navigate(['/admin/album-videos', id]);
    }
}
