import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { environment } from 'src/environments/environment.prod';
import { AddCountryComponent } from '../../add-country/add-country.component';

@Component({
  selector: 'app-reading-club-details',
  templateUrl: './reading-club-details.component.html',
  styleUrls: ['./reading-club-details.component.css']
})
export class ReadingClubDetailsComponent {
  readingClub: any;
  id: any;
  // @ViewChild('editor', { static: true }) editorElement: ElementRef;
  Title:string;
  userId:number;
  ImageFile:string;
  publishingHouse:string
  date:any;
  users: any[];
  constructor(private service: MainDashoardService,
    // @Inject(MAT_DIALOG_DATA) public data: any,
    // private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    // private dialogRef: MatDialogRef<AddCountryComponent>
  ) {
    // this.dateAdapter.setLocale('ar-eg');
    // jak.setLocale('ar-eg');
 
    
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
    });
    this.loadClubs();
   
  }
  loadClubs() {
    this.service.readingClubService.getById(this.id).subscribe(response => {
      if (response.statusCode == '200') {
        console.log(response.data);
        
        this.readingClub = response.data;
        this.Title = this.readingClub.title;
        this.ImageFile= this.readingClub.clubImage;
        this.date= this.readingClub.date;
         this.ImageFile = environment.baseImageUrl + this.ImageFile
        // this.loadWritters()
      }
    })
   
  }

  // closeDialog(): void {
  //   this.dialogRef.close();
  // }
  // loadWritters() {
  //   this.service.accountService.getAll().subscribe(response => {
  //     if (response.statusCode == "200") {
  //       this.users = response.data;
  //     }
  //   }

  //   );
  // }
}
