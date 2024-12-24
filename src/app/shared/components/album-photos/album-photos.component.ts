import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumPhotosService } from 'src/app/dashboard/services/album-photos.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { CvImagePopupComponent } from '../cv-image-popup/cv-image-popup.component';

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent {
  pageResponse:PagedResponse={page:1,pageSize:15,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:15,name:''};
  items:any[]=[]
  id:any
  constructor(public service:MainDashoardService,private router: Router,private PhotosService:AlbumPhotosService
    ,private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.pagedRequest.id = params['id'];
    });
  }
  ngOnInit(): void {
   this.loadAlbumPhoto();
  }
  loadAlbumPhoto(){
    this.PhotosService.getPage(this.pagedRequest).subscribe(res=>{
      this.pageResponse=res;
     this.items=this.pageResponse.items;
    })
  }
  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;
    return Math.ceil(totalCount / pageSize);
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:16,name:''};
    this.ngOnInit()
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:16,name:''};
    this.loadAlbumPhoto()
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
