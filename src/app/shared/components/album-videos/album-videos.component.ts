import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumPhotosService } from 'src/app/dashboard/services/album-photos.service';
import { AlbumVideoService } from 'src/app/dashboard/services/album-video.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { DialogVideoImageComponent } from '../dialog-video-image/dialog-video-image.component';

@Component({
  selector: 'app-album-videos',
  templateUrl: './album-videos.component.html',
  styleUrls: ['./album-videos.component.css']
})
export class AlbumVideosComponent {
  pageResponse:PagedResponse={page:1,pageSize:15,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:15,name:''};
  items:any[]=[]
  id:any
  constructor(public service:MainDashoardService,private router: Router,private AlbumVideoService:AlbumVideoService
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
    this.AlbumVideoService.getPage(this.pagedRequest).subscribe(res=>{
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
  @ViewChild('dialog', { static: true }) dialogComponent: DialogVideoImageComponent | undefined;
  openModal(path:any){
    //console.log(path)
      this.dialogComponent.openVideo(path);
  }
}
