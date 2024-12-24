import { Component, Input, Renderer2 ,OnInit, Output, EventEmitter, HostListener} from '@angular/core';
import { ContactInformationModel } from 'src/app/dashboard/core/models/contact-information-model';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { KafaatMainService } from 'src/app/kafaat/services/kafaat-main.service';
import { ProgramsService } from 'src/app/kafaat/services/programs.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isUserAuth:boolean=false;
  userName:string='';
  userImage:string = '/assets/images/male.png'
  programs:any[]=[];
  contactInformationLinks:any = {
      id:0,
      title:"",
      whatsapp:"",
      email:"",
      location:"",
      facebookLink:"",
      youtubeLink:"",
      instagramLink:"",
      twitterLink:"",
      telegramLink:"",
      snapchatLink:"",
      linkedInLink:"",
      introductoryVideoLink:"",
      liveFeedLink:"",
  };
  @Input() typeNav: string="light";
  @Input() active:number=-1;
  @Output() handleOpenNav = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2,private service:KafaatMainService,private adminService:MainDashoardService,private Programservice:ProgramsService) {
    this.service.authService.isUserAuthSubj.subscribe(status=>{
      this.isUserAuth = status;
    });
  }
  ngOnInit(): void {
    if (this.isUserAuth) {
      this.userName = this.service.authService.currentUser().userName;
      this.userImage = this.service.authService.currentUser().userImage;
    }
   // this.loadPrograms();
    this.getContactInformationLinks();
    this.getProgramsFromLocalStorage();
  }
  getContactInformationLinks(){
    this.adminService.contactInformationService.get().subscribe({
      next:(res:ResponseVM)=>{
        if (res.statusCode == 200) {
          this.contactInformationLinks = res.data as ContactInformationModel;
        }
        else {
          this.service.toastService.error(res.message);
        }
      },error:(error)=>{
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error; // Use the error message from the 'error' property
        } else if (error.message) {
          errorMessage = error.message; // Use the 'message' property if available
        }
        this.service.toastService.error(errorMessage);
      }
    });
  }
  // loadPrograms(){
  //   this.Programservice.geAll().subscribe(response=>{
  //     if(response.statusCode=='200'){
  //       this.programs=response.data;
  //     }
  //   })
  // }

  getProgramsFromLocalStorage(){
    const storedPhotos = localStorage.getItem('programs');
    if (storedPhotos) {
      this.programs = JSON.parse(storedPhotos);
    } else {
      this.programs = [];
    }
  }
  openNav(): void {
    document.getElementById("mySidenav")!.style.width = "75%";
    this.handleOpenNav.emit(true);
  }

  closeNav(): void {
    document.getElementById("mySidenav")!.style.width = "0";
    this.handleOpenNav.emit(false);
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    this.checkIfElementReachedTop();
  }

  private checkIfElementReachedTop() {

    const scrollPosition = window.scrollY || window.pageYOffset;
     if(scrollPosition <= 0)
    {
      document.getElementById('navbar')!.style.display='none';
    }else{
      document.getElementById('navbar')!.style.display='block';
    }
  }
  logout(){
    this.service.authService.logoutAndRedirectToHome();
  }
}
