import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { CvImagePopupComponent } from 'src/app/shared/components/cv-image-popup/cv-image-popup.component';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddAlbumPhotoComponent } from '../add-album-photo/add-album-photo.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AlbumVideoService } from '../../services/album-video.service';
import { VideosService } from '../../services/videos.service';
import { AddAlbumVideoComponent } from '../add-album-video/add-album-video.component';
import { DialogVideoImageComponent } from 'src/app/shared/components/dialog-video-image/dialog-video-image.component';

@Component({
  selector: 'app-album-video',
  templateUrl: './album-video.component.html',
  styleUrls: ['./album-video.component.css']
})
export class AlbumVideoComponent {
  windowWidth: number = 0;
  id:number
  album:any
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(private route: ActivatedRoute,private service:MainDashoardService,
    private VideosService:VideosService,private AlbumVideoService:AlbumVideoService){
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
    this.pagedRequest={pageNumber:1,pageSize:5,id:this.id,name:''}
    this.getPage();
    this.loadAlbum();

   }
  loadAlbum(){
    this.VideosService.getById(this.id).subscribe(response=>{
      if(response.statusCode=='200')
      this.album=response.data;
    })
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
    this.AlbumVideoService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }
  addItem(id:number): void {
    const albumId = id;
    const dialogRef = this.service.dialog.open(AddAlbumVideoComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:albumId,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(AddAlbumVideoComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
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
        title:'حذف الفيديو',
        submit:()=>{
          this.AlbumVideoService.delete(element.id).pipe(
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
  showImage(cv:any){
    const dialogRef = this.service.dialog.open(CvImagePopupComponent, {

      width:'75%',
      height:'90%',
      data:{
        cvImage:cv,
      }
    })
  }
  @ViewChild('dialog', { static: true }) dialogComponent: DialogVideoImageComponent | undefined;
  openModal(path:any){
    console.log(path)
      this.dialogComponent.openVideo(path);
  }
}
