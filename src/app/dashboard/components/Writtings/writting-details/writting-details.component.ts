import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { environment } from 'src/environments/environment.prod';
import { AddCountryComponent } from '../../add-country/add-country.component';

@Component({
  selector: 'app-writting-details',
  templateUrl: './writting-details.component.html',
  styleUrls: ['./writting-details.component.css']
})
export class WrittingDetailsComponent {
  writting: any;
  id: number = 1;
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  Title:string;
  userId:number;
  ImageFile:string;
  publishingHouse:string
  date:any;
  users: any[];
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddCountryComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
 
    
  }
  async ngOnInit(): Promise<void> {
    
    await this.loadArticle();
   
  }
  loadArticle() {
    this.service.writtingService.getById(this.data.id).subscribe(response => {
      if (response.statusCode == '200') {
        console.log(response.data);
        
        this.writting = response.data;
        this.Title = this.writting.title;
        this.userId= this.writting.userId; 
        this.ImageFile= this.writting.publishImage;
        this.publishingHouse= this.writting.publishingHouse;
        this.date= this.writting.publishDate;
         this.ImageFile = environment.baseImageUrl + this.ImageFile
        this.loadWritters()
      }
    })
   
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  loadWritters() {
    this.service.accountService.getAll().subscribe(response => {
      if (response.statusCode == "200") {
        this.users = response.data;
      }
    }

    );
  }
}
