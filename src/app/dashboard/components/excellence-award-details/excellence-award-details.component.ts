import { AwardConditionsService } from './../../services/award-conditions.service';
import { Component, OnInit } from '@angular/core';
import { ExcellenceAwardService } from '../../services/excellence-award.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ActivatedRoute } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { AddAwardConditionComponent } from '../add-award-condition/add-award-condition.component';
import { EditAwardConditionComponent } from '../edit-award-condition/edit-award-condition.component';

@Component({
  selector: 'app-excellence-award-details',
  templateUrl: './excellence-award-details.component.html',
  styleUrls: ['./excellence-award-details.component.css']
})
export class ExcellenceAwardDetailsComponent implements OnInit {
  id:number;
  excellenceAward:any;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:'',id:0};
  windowWidth: number = 0;
  constructor(public excellenceAwardService:ExcellenceAwardService,
    private service: MainDashoardService, private route: ActivatedRoute,
  private awardConditionsService:AwardConditionsService){

      this.route.params.subscribe(params => {
        this.id = params['id'];
        console.log(this.id);
      });
      this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
    }
  ngOnInit(): void {
    this.loadData();
    this.getPage();
  }
    loadData(){
      this.excellenceAwardService.getById(this.id).subscribe({
        next:(res:ResponseVM)=>{
          if(res.statusCode==200){
        this.excellenceAward=res.data;
        console.log(this.excellenceAward);
          }else{
            this.service.toastService.error(res.message);
          }
        },
        error:(error)=>{
          this.service.toastService.error(error.error);
        }
      })
    }
    getPage(){
      this.awardConditionsService.getPage(this.pagedRequest).subscribe({
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
    deleteItem(id:number){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
        width:this.windowWidth<767?'70%':(this.windowWidth<1300?'50%':'40%'),
        data:{
          id:element.id,
          name:element.condition,
          title:'حذف الجائزة',
          label:'اسم الجائزة',
          submit:()=>{
            this.awardConditionsService.delete(element.id).subscribe((response) => {
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
      const dialogRef = this.service.dialog.open(AddAwardConditionComponent, {
        width:this.windowWidth<767?'70%':(this.windowWidth<1300?'50%':'40%'),
        height:'45vh',
        data:this.id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
    editItem(id:any){
      const element=  this.pageResponse.items.find((value:any)=>value.id==id);
      const dialogRef = this.service.dialog.open(EditAwardConditionComponent, {
        width:this.windowWidth<767?'70%':(this.windowWidth<1300?'50%':'40%'),
        data:element,
        height:'45vh'
      });
      dialogRef.afterClosed().subscribe(result => {
        this.getPage();
      });
    }
}
