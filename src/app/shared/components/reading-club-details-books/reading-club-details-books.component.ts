import { ReadingClubReportService } from 'src/app/kafaat/services/reading-club-report.service';
//import { ReadingClubReportService } from './../../../dashboard/services/reading-club-report.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { environment } from 'src/environments/environment';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';
import { ReadingClubParticipantService } from 'src/app/kafaat/services/reading-club-participant.service';
import { FormGroup, Validators } from '@angular/forms';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { JoinClubComponent } from 'src/app/kafaat/components/join-club/join-club.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterClubComponent } from '../filter-club/filter-club.component';

@Component({
  selector: 'app-reading-club-details-books',
  templateUrl: './reading-club-details-books.component.html',
  styleUrls: ['./reading-club-details-books.component.css']
})
export class ReadingClubDetailsBooksComponent implements OnInit {
  id:number;
  readingClub:any;
  ImageFile:any;
  readingClubReport:any;
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  pageResponse2:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest2:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  isParticipant:boolean=false;
  form:FormGroup = new FormGroup({});
  constructor(private activatedRoute:ActivatedRoute,private service:MainDashoardService,
    private readingClubReportS:ReadingClubReportService,private readingClubHeros:ReadingClubParticipantService,
    private mainService:KafaatMainService,public dialog: MatDialog){}
   ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param=>{ this.id = Number(param.get("id"))})
    //console.log(this.id);
    this.loadClub();
    this.createForm();
    this.loadClubreport();
    this.IsParticipant();
    this.pagedRequest= {pageNumber:1,pageSize:4,name:'',id:this.id};
    this.pagedRequest2= {pageNumber:1,pageSize:10,name:'',id:this.id};
    this.loadClubheros();
    this.loadBooks();
  }
  loadClub() {
    this.service.readingClubService.getById(this.id).subscribe(response => {
      if (response.statusCode == '200') {
        console.log(response.data);

        this.readingClub = response.data;
        //this.readingClub.title = this.readingClub.title;
        // this.ImageFile= this.readingClub.clubImage;
        // this.date= this.readingClub.date;
         this.ImageFile = environment.baseImageUrl + this.readingClub.clubImage;
        // this.loadWritters()
      }
    })

  }
  loadClubreport(){
    this.readingClubReportS.getById(this.id).subscribe({
      next:(res:any)=>{
        this.readingClubReport=res.data;
      }
    })
  }
  goToLink(url: string){

    url = environment.baseImageUrl + url
    console.log(url);
    window.open(url, "_blank");
}
  loadClubheros(){
    this.readingClubHeros.getPageHero(this.pagedRequest).subscribe({
      next:(res:any)=>{
        this.pageResponse=res.items;
        console.log(this.pageResponse);

      }
    })
  }
  createForm(){
    let _user = this.mainService.authService.currentUser();
    let participantId = _user.id;
    console.log(this.id);

    this.form = this.service.formBuilder.group({
      readingClubId:[this.id,[Validators.required]],
      participantId:[participantId,[Validators.required]]
    });
  }
  IsParticipant(){
    this.readingClubHeros.isHero(this.form.value).subscribe({
      next:(res=>{
        console.log(res);
        this.isParticipant=res;
      })
    })
  }
  loadBooks(){
    this.service.ReadingClubBookService.getPage(this.pagedRequest2).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.pageResponse2=res.items;

      }
    })
  }
  windowWidth: number = 0;
  joinClub(){
    //console.log(id);
    const dialogRef = this.dialog.open(JoinClubComponent, {
      width:this.windowWidth<767?'80%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:this.id,
      }
    });
  }
  filter(){
    const dialogRef = this.dialog.open(FilterClubComponent, {
      width:this.windowWidth<767?'60%':(this.windowWidth<1300?'50%':'40%'),
      // data:{
      //   id:this.id,
      // }
    });
  }

}
