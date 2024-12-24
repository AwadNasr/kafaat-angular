import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent {
  date:any;
  article: any;
  Title:string;
  programId:number;
  ImageFile:string;
  ArticleImage:string;
  Author:string;
  id:number;
  constructor(private service: MainDashoardService
    ,private activatedRoute:ActivatedRoute){

  }
  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe(param=>{ this.id = Number(param.get("id"))})
    await this.loadArticle(this.id);

  }
  path:string='http://localhost:8081/';
  loadArticle(id:any) {
    this.service.articleService.getById(id).subscribe(response => {
      if (response.statusCode == '200') {
console.log(response.data);

        this.article = response.data;
        this.Title = this.article.title;
        this.programId= this.article.programId;
        this.ImageFile= this.article.imagePath;
        this.ArticleImage= this.article.imageArticle;
        this.Author= this.article.author;
        this.date= this.article.date;
         this.ImageFile = environment.baseImageUrl + this.ImageFile
         this.ArticleImage= environment.baseImageUrl + this.ArticleImage
      }
    })

  }
}
