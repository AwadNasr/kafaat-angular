import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { AuthService } from '../../services/auth.service';
import { CategoryBooksService } from 'src/app/dashboard/services/category-books.service';

@Component({
  selector: 'app-reading-club-library-details',
  templateUrl: './reading-club-library-details.component.html',
  styleUrls: ['./reading-club-library-details.component.css']
})
export class ReadingClubLibraryDetailsComponent {
  id:any
  book:any
  categoryId:any=0
  pageResponse:any={page:1,pageSize:5,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:5,name:''};
  constructor(public service:MainDashoardService,private router: Router
    ,private authService:AuthService,private route: ActivatedRoute,
    private CategoryBooksService:CategoryBooksService
  ) {
     this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
      this.loadbook();
   }
  loadbook(){
    this.CategoryBooksService.getById(this.id).subscribe({
      next:(res:any)=>{
          this.book = res.data;
          this.categoryId=res.data.bookCategoryId
          this.getPage();

      }
    });
}
getPage(){
  this.pagedRequest={pageNumber:1,pageSize:5,name:'',id:this.categoryId};
    this.CategoryBooksService.getPage(this.pagedRequest).subscribe({
      next:(res:any)=>{
          this.pageResponse = res.items;
      }
    });
}
}
