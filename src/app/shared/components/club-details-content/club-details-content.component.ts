import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { JoinClubComponent } from 'src/app/kafaat/components/join-club/join-club.component';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ReadingClubParticipantService } from 'src/app/kafaat/services/reading-club-participant.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-club-details-content',
  templateUrl: './club-details-content.component.html',
  styleUrls: ['./club-details-content.component.css']
})
export class ClubDetailsContentComponent {
  id:number;
  readingClub:any
  ImageFile:any
  isParticipant:boolean=false;
  form:FormGroup = new FormGroup({});
  constructor(private activatedRoute:ActivatedRoute,private service:MainDashoardService,private readingclubParrticipant:ReadingClubParticipantService,private mainService:KafaatMainService,public dialog: MatDialog){}
   ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param=>{ this.id = Number(param.get("id"))})
    console.log(this.id);
    this.loadClub();
    this.createForm();
  }
  ngAfterViewInit(): void {
   this.IsParticipant();

  }
 // path:string='http://localhost:8081/'
  loadClub() {
    this.service.readingClubService.getById(this.id).subscribe(response => {
      if (response.statusCode == '200') {
        console.log(response.data);

        this.readingClub = response.data;
        // this.readingClub.title = this.readingClub.title;
        // this.ImageFile= this.readingClub.clubImage;
        // this.date= this.readingClub.date;
         this.ImageFile = environment.baseImageUrl +this.readingClub.clubImage;
         console.log(this.ImageFile);

        // this.loadWritters()
      }
    })

  }
  createForm(){
    let _user = this.mainService.authService.currentUser();
    let participantId = _user.id;
    this.form = this.service.formBuilder.group({
      readingClubId:[this.id,[Validators.required]],
      participantId:[participantId,[Validators.required]]
    });
  }
  IsParticipant(){
    this.readingclubParrticipant.isHero(this.form.value).subscribe({
      next:(res=>{
        console.log(res);
        this.isParticipant=res;
      })
    })
  }
  windowWidth: number = 0;
  joinClub(){
    //console.log(id);
    const dialogRef = this.dialog.open(JoinClubComponent, {
      width:this.windowWidth<767?'99%':(this.windowWidth<1300?'50%':'40%'),
      data:{
        id:this.id,
      }
    });
  }

}
