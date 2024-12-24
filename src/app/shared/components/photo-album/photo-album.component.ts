import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PhotosService } from 'src/app/dashboard/services/photos.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';

@Component({
  selector: 'app-photo-album',
  templateUrl: './photo-album.component.html',
  styleUrls: ['./photo-album.component.css']
})
export class PhotoAlbumComponent {
  pageResponse:PagedResponse={page:1,pageSize:15,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:15,name:''};
  items:any[]=[]
  constructor(public service:MainDashoardService,private router: Router,private PhotosService:PhotosService) {
  }
  ngOnInit(): void {
    this.pagedRequest.id=0;
   this.loadAlbumPhoto();
  }
  loadAlbumPhoto(){
    this.pagedRequest.id=0;
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
  naviagteToDetails(id:any){
    this.router.navigate(['/kafaat/album-photos', id]);
  }
}
