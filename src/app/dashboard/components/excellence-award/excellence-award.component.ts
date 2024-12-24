import { ExcellenceAwardService } from './../../services/excellence-award.service';
import { Component, OnInit } from '@angular/core';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddExcellenceClubComponent } from '../add-excellence-club/add-excellence-club.component';
import { EditExcellenceAwardComponent } from '../edit-excellence-award/edit-excellence-award.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excellence-award',
  templateUrl: './excellence-award.component.html',
  styleUrls: ['./excellence-award.component.css']
})
export class ExcellenceAwardComponent implements OnInit {
  windowWidth: number = 0;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:'',id:0};
  constructor(public excellenceAwardService:ExcellenceAwardService,
    private service:MainDashoardService,private router: Router) {
  }
  ngOnInit(): void {
      this.getPage();
    }
  getPage(){
    this.excellenceAwardService.getPage(this.pagedRequest).subscribe({
      next:(res:PagedResponse)=>{
          this.pageResponse = res;
          console.log(this.pageResponse);
      }
    });
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
  addItem(): void {
    const dialogRef = this.service.dialog.open(AddExcellenceClubComponent, {
      width:this.windowWidth<767?'70%':(this.windowWidth<1300?'50%':'40%'),
      height:'70vh'
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
        title:'حذف الجائزة',
        label:'اسم الجائزة',
        submit:()=>{
          this.excellenceAwardService.delete(element.id).subscribe((response) => {
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
    const dialogRef = this.service.dialog.open(EditExcellenceAwardComponent, {
      width:this.windowWidth<767?'70%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'70vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  openAward(id:any){
    this.router.navigate(['/admin/excellence-awardDetails', id]);
  }
}
