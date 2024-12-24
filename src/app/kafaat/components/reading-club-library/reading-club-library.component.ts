import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryCategoryService } from 'src/app/dashboard/services/library-category.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { AuthService } from '../../services/auth.service';
import { CategoryBooksService } from 'src/app/dashboard/services/category-books.service';
import { ResponseVM } from '../../core/models/response-vm';

@Component({
  selector: 'app-reading-club-library',
  templateUrl: './reading-club-library.component.html',
  styleUrls: ['./reading-club-library.component.css']
})
export class ReadingClubLibraryComponent {

  books:any
  pageResponse:any={page:1,pageSize:16,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:16,name:''};
  navList:any[];
  allCategories:any[];
 categoryId:any;
 items:any
 constructor(public service:MainDashoardService,private router: Router,
  private authService:AuthService,private route: ActivatedRoute,private LibraryCategoryService:LibraryCategoryService,
  private CategoryBooksService:CategoryBooksService
) {
  this.loadCategories();
}
ngOnInit(): void {

 // this.pagedRequest= {pageNumber:1,pageSize:5,name:''};
    this.getPage();
}
getPageByName(){
  this.getPage();
}
  loadCategories(){
    this.LibraryCategoryService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.allCategories = res.data;
          this.navList = [];
          for (let i = 0; i < this.allCategories.length; i++) {
            this.navList.push({
              id: this.allCategories[i].id,
              label: this.allCategories[i].title,
              isSelected: i === 0,
            });
          }
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  getPage(id:number = 3){
    this.pagedRequest.id=id
      this.CategoryBooksService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.pageResponse = res;
            this.items = this.pageResponse.items;
            // this.items.forEach((element: { image: any; }) => {

            //   if (!element.image || element.image.trim() === '') {
            //     element.image = environment.baseImageUrl +'assets/male.png';
            //   } else {
            //     element.image = environment.baseImageUrl + element.image;
            //   }
            // });
        }
      });
  }
  selectItem(id:any){
    this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
    this.categoryId=id
     this.getPage(id);
  }
  get pagesNumber(): any {
    const totalCount = this.pageResponse.totalCount;
    const pageSize = this.pagedRequest.pageSize;
    return Math.ceil(totalCount / pageSize);
  }
  next(evetn:number){
    this.pagedRequest = {pageNumber:evetn,pageSize:16,name:''};
    this.getPage(this.categoryId);
  }
  back(event:number){
    this.pagedRequest = {pageNumber:event,pageSize:16,name:''};
    this.getPage(this.categoryId);
  }
}
