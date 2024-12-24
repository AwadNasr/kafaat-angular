//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ExcelServicesService } from '../../services/excel-services.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { PublisherService } from '../../services/publisher.service';
import { FamilyWritingsService } from '../../services/family-writings.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { EditQrComponent } from '../edit-qr/edit-qr.component';
import { EditBookImageComponent } from '../edit-book-image/edit-book-image.component';
import { catchError, throwError } from 'rxjs';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { UserProfilePopUpComponent } from '../user-profile-pop-up/user-profile-pop-up.component';

@Component({
  selector: 'app-approved-publications',
  templateUrl: './approved-publications.component.html',
  styleUrls: ['./approved-publications.component.css']
})
export class ApprovedPublicationsComponent {

  windowWidth: number = 0;
  id:any
  pageResponse:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  navList:any[];
  allFamilyWritings:any[];

  elementType = 'url';
  qrCodeStyle = {
    color: 'red',  // This will change the color of the QR code
    backgroundColor: 'white',  // You can also customize the background color if needed
  };
  constructor( private excelService:ExcelServicesService,public service:MainDashoardService,
    private route:ActivatedRoute,private router: Router,private FamilyWritingsService:FamilyWritingsService,
    private servicee:KafaatMainService,private PublisherService:PublisherService
  ){
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    this.loadFamilyWritings();

  }

  ngOnInit(): void {
    this.pagedRequest= {pageNumber:1,pageSize:5,name:'',id:this.id};
    this.getPage();

  }
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }
  getPageByName(){
    this.getPage(this.id);
  }
  changePageSize(){
    this.pagedRequest.pageNumber = 1;
    this.getPage(this.id);
  }
  changePageNumber(event:any){
    this.pagedRequest.pageNumber = event;
    this.getPage(this.id);
  }
  getPage(id:number = this.id){
    this.pagedRequest.id=id
      this.PublisherService.getPageApproved(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
        }
      });
  }
  loadFamilyWritings(){
    this.FamilyWritingsService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.allFamilyWritings = res.data;
          this.navList = [];
          for (let i = 0; i < this.allFamilyWritings.length; i++) {
              this.navList.push({
                id: this.allFamilyWritings[i].id,
                label: this.allFamilyWritings[i].name,
                isSelected: i === 0,
              });
          }
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
    this.id=id
     this.getPage(id);
  }
  editItem(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(EditQrComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'40vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  editImage(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(EditBookImageComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:element,
      height:'70vh'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPage();
    });
  }
  viewUserProfile(id:any){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(UserProfilePopUpComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'60%':'50%'),
      data:{
        id
      }
    })
  }
  deleteItem(id:number){
    const element=  this.pageResponse.items.find((value:any)=>value.id==id);
    const dialogRef = this.service.dialog.open(DialogDeleteComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:element.participantId,
        name:element.userDisplayName,
        title:'حذف المشارك',
        label:'اسم المشارك',
        submit:()=>{
          this.PublisherService.delete(element.id).pipe(
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
