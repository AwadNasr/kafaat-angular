import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReadingClubReportService } from 'src/app/kafaat/services/reading-club-report.service';
import { FilterClubComponent } from 'src/app/shared/components/filter-club/filter-club.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reading-club',
  templateUrl: './reading-club.component.html',
  styleUrls: ['./reading-club.component.css']
})
export class ReadingClubComponent {
  readingClubRepostData:any;
  constructor(private readingClubReportService:ReadingClubReportService,public dialog: MatDialog){}
  ngOnInit(): void {
    this.getLastReport();
  }
  getLastReport(){
    this.readingClubReportService.getLast().subscribe((val)=>{
      this.readingClubRepostData = val.data;
      console.log(this.readingClubRepostData);

    })
  }
  goToLink(url: string){

    url = environment.baseImageUrl + url
    console.log(url);
    window.open(url, "_blank");
}
windowWidth: number = 0;
filter(){
  const dialogRef = this.dialog.open(FilterClubComponent, {
    width:this.windowWidth<767?'60%':(this.windowWidth<1300?'50%':'40%'),
    // data:{
    //   id:this.id,
    // }
  });
}
}
