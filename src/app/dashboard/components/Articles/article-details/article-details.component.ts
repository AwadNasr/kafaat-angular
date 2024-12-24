import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { AddCountryComponent } from '../../add-country/add-country.component';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent {
  article: any;
  id: number = 1;
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  Title:string;
  programId:number;
  ImageFile:string;
  ArticleImage:string;
  Author:string
  date:any;
  projects: any[];
  programs: any[];
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
    this.service.articleService.getById(this.data.id).subscribe(response => {
      if (response.statusCode == '200') {

        this.article = response.data;
        this.Title = this.article.title;
        this.programId= this.article.programId;
        this.ImageFile= this.article.imagePath;
        this.ArticleImage= this.article.imageArticle;
        this.Author= this.article.author;
        this.date= this.article.date;
         this.ImageFile = environment.baseImageUrl + this.ImageFile
         this.ArticleImage = environment.baseImageUrl + this.ArticleImage
        this.loadProjects()
      }
    })

  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  loadProjects() {
    this.service.programsService.getAll().subscribe(response => {
      if (response.statusCode == "200") {
        this.projects = response.data;
        this.programs = response.data;
      }
    }

    );
  }
}
