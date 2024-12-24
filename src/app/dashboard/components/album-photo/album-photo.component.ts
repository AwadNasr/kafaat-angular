import { Component } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AlbumPhotosService } from '../../services/album-photos.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { catchError, throwError } from 'rxjs';
import { AddPhotoComponent } from '../../add-photo/add-photo.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddAlbumPhotoComponent } from '../add-album-photo/add-album-photo.component';
import { CvImagePopupComponent } from 'src/app/shared/components/cv-image-popup/cv-image-popup.component';

@Component({
  selector: 'app-album-photo',
  templateUrl: './album-photo.component.html',
  styleUrls: ['./album-photo.component.css']
})
export class AlbumPhotoComponent {
  windowWidth: number = 0;
  id:number
  album:any
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  constructor(private route: ActivatedRoute,private service:MainDashoardService,
    private PhotosService:PhotosService,private AlbumPhotosService:AlbumPhotosService){
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
    this.PhotosService.getById(this.id).subscribe(response=>{
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
    this.AlbumPhotosService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
      }
    });
  }
  addItem(id:number): void {
    const albumId = id;
    const dialogRef = this.service.dialog.open(AddAlbumPhotoComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:albumId,
      height:'95vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(AddAlbumPhotoComponent, {
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
        title:'حذف الصورة',
        submit:()=>{
          this.AlbumPhotosService.delete(element.id).pipe(
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
}
