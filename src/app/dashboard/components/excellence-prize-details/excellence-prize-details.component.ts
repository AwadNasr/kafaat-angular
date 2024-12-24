import { StandardService } from './../../services/standard.service';
import { Component } from '@angular/core';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddStandardComponent } from '../add-standard/add-standard.component';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { EditStandardComponent } from '../edit-standard/edit-standard.component';

@Component({
  selector: 'app-excellence-prize-details',
  templateUrl: './excellence-prize-details.component.html',
  styleUrls: ['./excellence-prize-details.component.css']
})
export class ExcellencePrizeDetailsComponent {
id:any
excellencePrize:any
windowWidth: number = 0;
pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  navList:any[];
  allQualifications:any[];
  qualificationId:any
  constructor(private route: ActivatedRoute,private service:MainDashoardService,private excellencePrizeService:ExcellencePrizeService
    ,private StandardService:StandardService
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
   this.loadData()
   this.loadQualifications();
   this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
   this.getPage();
  }
  loadData(){
    this.excellencePrizeService.getById(this.id).subscribe(response=>{
      if(response.statusCode=='200')
      this.excellencePrize=response.data;
    })
  }
  addstandard(id:any){
      const dialogRef = this.service.dialog.open(AddStandardComponent, {
        width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
        data:id,
        height:'90vh'
      });
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    console.log(element);
    const dialogRef = this.service.dialog.open(EditStandardComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'90vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  getPageByName(){
    this.getPage(this.qualificationId);
  }
  changePageSize(){
    this.pagedRequest.pageNumber = 1;
    this.getPage(this.qualificationId);
  }
  changePageNumber(event:any){
    this.pagedRequest.pageNumber = event;
    this.getPage(this.qualificationId);
  }
  getPage(id:number = 10007){
    this.pagedRequest.qualificationId=id
      this.StandardService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
        }
      });
  }
  loadQualifications(){
    this.service.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.allQualifications = res.data;
          this.navList = [];
          for (let i = 0; i < this.allQualifications.length; i++) {
          
            if (this.allQualifications[i].name !== "إبتدائي") {
              this.navList.push({
                id: this.allQualifications[i].id,
                label: this.allQualifications[i].name,
                isSelected: i === 0,
              });
            }
          }
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
    this.qualificationId=id
     this.getPage(id);
  }
  deleteItem(id:number){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.id,
        name:element.name,
        title:'حذف معيار',
        label:'اسم المعيار',
        submit:()=>{
          this.StandardService.delete(element.id).pipe(
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
}
