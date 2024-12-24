import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { AuthService } from '../../services/auth.service';
import { ReadingClubTripsService } from 'src/app/dashboard/services/reading-club-trips.service';
import { CategoryBooksService } from 'src/app/dashboard/services/category-books.service';
import { ReadingClubTripsParticipantsService } from 'src/app/dashboard/services/reading-club-trips-participants.service';
import { environment } from 'src/environments/environment';
import { ReadingClubTripBooksService } from 'src/app/dashboard/services/reading-club-trip-books.service';

@Component({
  selector: 'app-read-club-trip-details',
  templateUrl: './read-club-trip-details.component.html',
  styleUrls: ['./read-club-trip-details.component.css']
})
export class ReadClubTripDetailsComponent {
  readClubTrip:any;
  id:any
  books:any
  pageResponse:any={page:1,pageSize:16,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:any = {pageNumber:1,pageSize:16,name:''};
 allQualifications:any[]=[{id:1,name:'متوسط'},{id:2,name:'ثانوي'},{id:3,name:'جامعي'}];
 pageResponse1:any={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest1:any = {pageNumber:1,pageSize:5,name:''};
 navList:any[];
 qualificationId:any;
 items:any
  constructor(public service:MainDashoardService,private router: Router
    ,private authService:AuthService,private route: ActivatedRoute,private ReadingClubTripsService:ReadingClubTripsService,
    private CategoryBooksService:CategoryBooksService,private ReadingClubTripsParticipantsService:ReadingClubTripsParticipantsService,
    private ReadingClubTripBooksService:ReadingClubTripBooksService
  ) {
     this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.loadQualifications();
  }
  ngOnInit(): void {
    this.pagedRequest= {pageNumber:1,pageSize:16,name:'',id:this.id};
    this.pagedRequest1= {pageNumber:1,pageSize:3,name:'',id:this.id};
      this.loadReadClubTrip();
      this.getPageBooks();
     // this. loadbooks();
      this.getPage();

    }
    loadReadClubTrip(){
      this.ReadingClubTripsService.getById(this.id).subscribe({
        next:(res:any)=>{
            this.readClubTrip = res.data;
        }
      });
  }
  // getPageBooks() {
  //   this.ReadingClubTripBooksService.getPage(this.pagedRequest1).subscribe({
  //     next: (res: any) => {
  //       this.pageResponse1 = res.items.map((item: any) => ({
  //         ...item,
  //         showMore: false,
  //       }));
  //     },
  //   });
  // }
  getPageBooks() {
    this.ReadingClubTripBooksService.getPage(this.pagedRequest1).subscribe({
      next: (res: any) => {
        this.pageResponse1 = res.items
          .map((item: any) => ({
            ...item,
            showMore: false,
          }))
          .sort((a: any, b: any) => {
            const getHighestPriority = (qualifications: any[]) => {
              const priorityOrder = [10013, 10012];
              for (const priority of priorityOrder) {
                if (qualifications.some((q) => q.qualificationId === priority)) {
                  return priorityOrder.indexOf(priority);
                }
              }
              return priorityOrder.length;
            };

            const aPriority = getHighestPriority(a.booksQualification);
            const bPriority = getHighestPriority(b.booksQualification);

            return aPriority - bPriority;
          });
      },
    });
  }

  toggleReadMore(item: any) {
    item.showMore = !item.showMore;
  }
// getPageBooks(){
//   this.ReadingClubTripBooksService.getPage(this.pagedRequest).subscribe({
//     next:(res:any)=>{
//         this.pageResponse1 = res.items;
//     }
//   });
// }
getPage(id:number = 1){
  this.pagedRequest.qualificationId=id
    this.ReadingClubTripsParticipantsService.getPageHeros(this.pagedRequest).subscribe({
      next:(res:any)=>{
          this.pageResponse = res;
          this.items = this.pageResponse.items;
          this.items.forEach((element: { image: any; }) => {

            if (!element.image || element.image.trim() === '') {
              element.image = environment.baseImageUrl +'assets/male.png';
            } else {
              element.image = element.image;
            }
          });
      }
    });
}
loadQualifications(){
        this.navList = [];
        for (let i = 0; i < this.allQualifications.length; i++) {
          this.navList.push({
            id: this.allQualifications[i].id,
            label: this.allQualifications[i].name,
            isSelected: i === 0,
          });
        }
}
selectItem(id:any){
  this.navList.map(x=>x.id==id?x.isSelected=true:x.isSelected=false);
  this.qualificationId=id
   this.getPage(id);
}
get pagesNumber(): any {
  const totalCount = this.pageResponse.totalCount;
  const pageSize = this.pagedRequest.pageSize;
  return Math.ceil(totalCount / pageSize);
}
next(evetn:number){
  this.pagedRequest = {pageNumber:evetn,pageSize:16,name:'',id:this.id};
  this.getPage(this.qualificationId);
}
back(event:number){
  this.pagedRequest = {pageNumber:event,pageSize:16,name:'',id:this.id};
  this.getPage(this.qualificationId);
}

// SubStringFun(str: any) {
//   if (str.length > 100) {
//     const words = str.split(' ');
//     let shortString = words.slice(0, 25).join(' ');
//     shortString += `
//       <a
//         style="color: blue !important; cursor: pointer;">
//         ...المزيد
//       </a>`;
//     return shortString;
//   }
//   return str;
// }
SubStringFun(str: any): string {
  if (str.length > 100) {
    const wordsArray = str.split(' ');
    const truncatedString = wordsArray.slice(0, 25).join(' ');
    return `${truncatedString} <span class=" read-more1 ">...المزيد</span>`;
  }
  return str;
}
navigateToParticipant(userId:string){
  this.router.navigate(['/kafaat/book-details', userId]);
}
onReadMoreClick(event: Event, id: any): void {
  // Stop the event from propagating to the parent container
  event.stopPropagation();
  console.log('Read more clicked for item:', id);
  // Navigate or perform other actions
  this.navigateToParticipant(id);
}
}
