import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { DateAdapter, ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/kafaat/services/auth.service';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsCssLoaderService } from '../../services/js-css-loader.service';
declare const Quill: any;

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent  implements AfterViewInit{
  group1:FormGroup = new FormGroup({});
  group2:FormGroup = new FormGroup({});
  filter:FormGroup = new FormGroup({});
  id:number
  minWidth: number = 500;
  minHeight: number = 400;

  filterSupervisor:FormGroup = new FormGroup({});
  filterActivityType:FormGroup = new FormGroup({});
  filterUserActivity:FormGroup = new FormGroup({});
  @ViewChild('picker') picker: any;

  public dateMoment: moment.Moment;

  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  supervisorValue:string = "";
  supervisorsCopy:any[]=[];
  public color: ThemePalette = 'primary';
  public dateControl = new FormControl(new Date(2021,9,4,5,6,7));
  public dateControlMinMax = new FormControl(new Date());
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  programs:any[]
  projects:any[]
  supervisors:any[]
  userCategories:any[]
  userCategoriesFilter:any[]
  supervisorsFilter:any[]
  activityTypes:any[]
  activityTypesFilter:any[]
  fileName=""
  NameActivity=""

  constructor(private service:MainDashoardService,private dateAdapter: DateAdapter<Date>,private jak:NgxMatDateAdapter<Date>,private route: ActivatedRoute,private authService:AuthService,
    private router:Router ,private JsCssLoaderService:JsCssLoaderService) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg')

    // this.route.params.subscribe(params => {
    //   this.id = params['id'];

    // });

  }
  textPresetVal: any;
  // ngAfterViewInit(): void {
  //   this.initializeQuillEditor()
  // }
  async ngAfterViewInit(): Promise<void> {
    // Load the Quill CSS files lazily
    try {
      await this.JsCssLoaderService.loadCSSFiles([
        'assets/libs/quill.snow.css',
        'assets/libs/quill.bubble.css'
      ]);
      // Load the Quill and editor scripts lazily
      await this.JsCssLoaderService.loadScripts([
        'assets/libs/quill.min.js',
        'assets/js/quill-editor.js'
      ]);
      this.initializeQuillEditor();
    } catch (error) {
      console.error('Error loading CSS or scripts:', error);
    }
  }


  isLinear = false;
 async ngOnInit(): Promise<void> {
    // if(this.id){
    //  await this.loadActivity();
    // }
    this.createForm();
    this.loadProjects();
    this.loadSupervisors();
    this.loadUserCategories();
    this.loadActivityTypes();
    this.filter.valueChanges.subscribe(newValue => {
      this.projects = this.programs.filter(value => value.title.includes(newValue.filterInput));
    });
    this.filterSupervisor.valueChanges.subscribe(newValue => {
      this.supervisors = this.supervisorsFilter.filter(value => value.displayName.includes(newValue.filterInput2));
    });

    this.filterActivityType.valueChanges.subscribe(newValue => {
      this.activityTypes = this.activityTypesFilter.filter(value => value.type.includes(newValue.filterInput0));
    });
    this.filterUserActivity.valueChanges.subscribe(newValue => {
      this.userCategories = this.userCategoriesFilter.filter(value => value.name.includes(newValue.filterInput3));
    });


    this.userCategoryId.valueChanges.subscribe(newValue => {
      const difference = newValue.length - this.userCategories.length;

      if (difference !== 1) {
        // Check if 0 is present in the new value array
        const indexOfZero = newValue.indexOf(0);

        if (indexOfZero !== -1) {
          // Remove 0 from the new value array
          newValue.splice(indexOfZero, 1);

          // Update the FormControl value without emitting another change event
          this.userCategoryId.setValue(newValue, { emitEvent: false });
        }
      }
    });

  }


  private initializeQuillEditor() {
    const toolbarOptions = [
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      // [{ "font": [12,15,20,25,30] }],
      ['bold', 'underline'],
      // ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],
      // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // [{ 'script': 'sub' }, { 'script': 'super' }],
      // [{ 'indent': '-1' }, { 'indent': '+1' }],
      // [{ 'direction': 'rtl' }],
      // [{ 'size': ['small', false, 'large', 'huge'] }],
      // [{ 'color': ['red','white','black','yellow','blue','green'] }, { 'background': ['red','white','black','yellow','blue','green'] }],
      // [{ 'align': ['rtl','ltr'] }],
      // ['image', 'video'],
      // ['clean']
    ];

    const quill = new Quill(this.editorElement.nativeElement, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    });
  //  if(this.activity){
  //   document.getElementsByClassName('ql-editor')[0].innerHTML=this.activity.description
  //  }

  }
//   activity:any
//   loadActivity(){
//     this.service.activityService.getById(this.id).subscribe(response=>{
//       if(response.statusCode=='200'){

//         this.activity=response.data;

//         this.createForm()
// }    })
//   }

  loadProjects(){
    this.service.programsService.getAll().subscribe(response=>{
      if(response.statusCode=="200"){
        this.projects=response.data;
        this.programs=response.data;
      }
    }

    );
}

loadUserCategories(){
  this.service.userCategoryService.getAll().subscribe(response=>{

    if(response.statusCode=="200"){

      this.userCategories=response.data;
      this.userCategoriesFilter=response.data;


    }
  }

  );
}
loadActivityTypes(){
  this.service.typeActivity.getAll().subscribe(response=>{

    if(response.statusCode=="200"){

      this.activityTypes=response.data;
      this.activityTypesFilter=response.data;


    }
  }

  );
}

loadSupervisors(){
  this.service.accountService.getAll().subscribe(response=>{
    if(response.statusCode=="200"){
      this.supervisorsFilter=response.data;
      this.supervisors=response.data;
      this.supervisorsCopy = this.supervisors;
    }
  }

  );
}

loadCounters(){
  this.service.accountService.getAll().subscribe(res=>{

  })
}
onChangeFilter(event:any){


}
  ImagePath:File
  // createForm(){
  //   if(this.activity){
  //    // this.NameActivity=this.activity.name

  //     this.group1 = this.service.formBuilder.group({
  //       // description:[this.activity.description,[Validators.required]],
  //       place:[this.activity.place,[Validators.required]],
  //       date:[this.activity.date,[Validators.required]],
  //       nameActivity:[this.activity.name,[Validators.required]],
  //       to:[this.activity.to,[Validators.required]],
  //     });


  //     this.group2=this.service.formBuilder.group({
  //       maximumParticipants:[this.activity.maximumParticipants,[Validators.required]],
  //       ticketPrice:[this.activity.ticketPrice,[Validators.required]],
  //       imagePath:[this.activity.imagePath,[Validators.required]],
  //       programId:[this.activity.programId,[Validators.required]],
  //       supervisorId:[this.activity.supervisorId,[Validators.required]],
  //       userCategoryId:[this.activity.categories,[Validators.required]],
  //       ActivityTypeId:[this.activity.activityTypeId,[Validators.required]]
  //     })
  //   }else{
  //     this.group1 = this.service.formBuilder.group({
  //       nameActivity:['',[Validators.required]],
  //       // description:['',[Validators.required]],
  //       place:['',[Validators.required]],
  //       date:['',[Validators.required]],
  //       to:['',[Validators.required]],
  //     });
  //     this.group2=this.service.formBuilder.group({
  //       maximumParticipants:[null,[Validators.required]],
  //       ticketPrice:[null,[Validators.required]],
  //       imagePath:['',[Validators.required]],
  //       programId:[null,[Validators.required]],
  //       supervisorId:[null,[Validators.required]],
  //       userCategoryId:[[],[Validators.required]],
  //       ActivityTypeId:[null,[Validators.required]]
  //     })
  //   }

  //   this.filter=this.service.formBuilder.group({
  //     filterInput:['']
  //   })

  //   this.filterSupervisor=this.service.formBuilder.group({
  //     filterInput2:['']
  //   })
  //   this.filterActivityType=this.service.formBuilder.group({
  //     filterInput0:['']
  //   })

  //   this.filterUserActivity=this.service.formBuilder.group({
  //     filterInput3:['']
  //   })
  // }
  createForm(){


        this.group1 = this.service.formBuilder.group({
          nameActivity:['',[Validators.required]],
          // description:['',[Validators.required]],
          place:['',[Validators.required]],
          date:['',[Validators.required]],
          to:['',[Validators.required]],
        });
        this.group2=this.service.formBuilder.group({
          maximumParticipants:[null,[Validators.required]],
          ticketPrice:[null,[Validators.required]],
          imagePath:['',[Validators.required]],
          programId:[null,[Validators.required]],
          supervisorId:[null,[Validators.required]],
          userCategoryId:[[],[Validators.required]],
          ActivityTypeId:[null,[Validators.required]]
        })


      this.filter=this.service.formBuilder.group({
        filterInput:['']
      })

      this.filterSupervisor=this.service.formBuilder.group({
        filterInput2:['']
      })
      this.filterActivityType=this.service.formBuilder.group({
        filterInput0:['']
      })

      this.filterUserActivity=this.service.formBuilder.group({
        filterInput3:['']
      })
    }

  dateUpdated(){

  }

  get filterInput(){
    return this.filter.controls['filterInput'];
  }

  get date(){
    return this.group1.controls['date'];
  }
  get nameActivity()
  {
    return this.group1.controls['nameActivity'];
  }
  get place()
  {
    return this.group1.controls['place'];
  }
  get description() {
    return this.group1.controls['description'];
  }

  get to()
  {
    return this.group1.controls['to'];
  }
  get supervisorId(){
    return this.group2.controls['supervisorId'];
  }
  get maximumParticipants(){
    return this.group2.controls['maximumParticipants'];
  }
  get ticketPrice(){
    return this.group2.controls['ticketPrice'];
  }
  get imagePath(){
    return this.group2.controls['imagePath'];
  }

  get programId(){
    return  this.group2.controls['programId'];

  }
  get filterInput2(){
    return  this.filterSupervisor.controls['filterInput2'];
  }

  get userCategoryId(){
    return  this.group2.controls['userCategoryId'];
  }

  get ActivityTypeId(){
    return  this.group2.controls['ActivityTypeId'];
  }

  get filterInput0(){
    return  this.filterActivityType.controls['filterInput0'];
  }

  get filterInput3(){
    return  this.filterUserActivity.controls['filterInput3'];
  }

  GetFileOnLoad(event:any){
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (this.isImageFile(file)) {
        this.checkImageDimensions(file).then((dimensions) => {
          const [width, height] = dimensions;
          if (width >= this.minWidth && height >= this.minHeight) {
            this.ImagePath=file;
            this.fileName=file.name;
            this.imagePath.setValue(file.name)
          } else {
            this.ImagePath=null;
            this.fileName='';
            this.imagePath.setValue('')
            this.service.toastService.error('Image dimensions must be at least 1000x1000 pixels.');
          }
        })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });
    } else {

      this.imagePath.setValue('')
      this.service.toastService.error('Please select a valid image file.');
    }

    }else {
      this.ImagePath=null;
      this.fileName='';
      this.imagePath.setValue('')
      alert('Please select a valid image file.');
    }

  }
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
  async checkImageDimensions(file: File): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve([image.width, image.height]);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = URL.createObjectURL(file);
    });
  }
//   onSubmit(){
//     var post=document.getElementsByClassName('ql-editor')[0].innerHTML;
//     if(post=='<p><br></p>'){
//       this.service.toastService.error('ادخل وصف المنشط مطلوب');
//       return;
//     }
//     if(this.group1.valid && this.group2.valid){
//       const formData = new FormData();

//       var dateString = this.group1.value.date;


// var dateObject = new Date(dateString);
// var localDate = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000));
// var date = localDate.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
// var dateString = this.group1.value.from;
// var dateObject = new Date(dateString);

// // var From = dateObject.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
// var dateString = this.group1.value.to;
// var dateObject = new Date(dateString);
// const userCategoriesData:number[] = this.group2.value.userCategoryId;

// var To = dateObject.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
//       formData.append('Report', 'empty');
//       formData.append('name', this.group1.value.nameActivity);
//       formData.append('description', post);
//       formData.append('place', this.group1.value.place);
//       formData.append('date', date);
//       // formData.append('from', From);
//       formData.append('to', To);
//       formData.append('maximumParticipants', this.group2.value.maximumParticipants);
//       formData.append('ticketPrice', this.group2.value.ticketPrice);
//       formData.append('imagePath', this.ImagePath);
//       formData.append('programId', this.group2.value.programId);
//       formData.append('supervisorId',this.group2.value.supervisorId );
//       // userCategoriesData.forEach((category, index) => {
//       //   console.log(category);
//       //    if(category!=0){
//       //   formData.append(`UserCategories[${index}]`, category.toString());
//       //    }
//       // });
//       let formIndex = 0;
//         userCategoriesData.forEach((category) => {
//             if (category !== 0) {
//                 formData.append(`UserCategories[${formIndex}]`, category.toString());
//                 formIndex++;
//             }
//         });
//       formData.append('ActivityTypeId', this.group2.value.ActivityTypeId);
//       console.log(formData);

//       if(this.activity){
//         formData.append('Id', this.activity.id);
//         this.service.activityService.update(formData).subscribe(response=>{
//           if(response.statusCode=='200'){
//             this.service.toastService.success(response.message)
//             this.router.navigate(['admin/activities'])
//           }else{
//             this.service.toastService.error(response.message);
//           }
//          },
//          (error) => {

//           if(error.error.errors.To){
//             this.service.toastService.error(error.error.errors.To)
//            }
//            if(error.error.errors.From){
//             this.service.toastService.error(error.error.errors.From)
//            }
//            if(error.error.errors.Date){
//             this.service.toastService.error(error.error.errors.Date)
//            }

//         })
//       }else{
//         formData.append('Id', '0');
//         this.service.activityService.add(formData).subscribe(response=>{
//           if(response.statusCode=='200'){
//             this.service.toastService.success(response.message)
//             this.router.navigate(['admin/activities'])
//           }else{
//             this.service.toastService.error(response.message);
//           }
//          },
//          (error) => {

//          if(error.error.errors.To){
//           this.service.toastService.error(error.error.errors.To)
//          }
//         //  if(error.error.errors.From){
//         //   this.service.toastService.error(error.error.errors.From)
//         //  }
//          if(error.error.errors.Date){
//           this.service.toastService.error(error.error.errors.Date)
//          }

//         })
//       }

//     }else{
//       this.service.toastService.error("افحص المدخلات");
//     }
//   }
onSubmit(){
  var post=document.getElementsByClassName('ql-editor')[0].innerHTML;
  if(post=='<p><br></p>'){
    this.service.toastService.error('ادخل وصف المنشط مطلوب');
    return;
  }
  if(this.group1.valid && this.group2.valid){
    const formData = new FormData();

    var dateString = this.group1.value.date;


var dateObject = new Date(dateString);
var localDate = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000));
var date = localDate.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
var dateString = this.group1.value.from;
var dateObject = new Date(dateString);

// var From = dateObject.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
var dateString = this.group1.value.to;
var dateObject = new Date(dateString);
const userCategoriesData:number[] = this.group2.value.userCategoryId;

var To = dateObject.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
    formData.append('Report', 'empty');
    formData.append('name', this.group1.value.nameActivity);
    formData.append('description', post);
    formData.append('place', this.group1.value.place);
    formData.append('date', date);
    // formData.append('from', From);
    formData.append('to', To);
    formData.append('maximumParticipants', this.group2.value.maximumParticipants);
    formData.append('ticketPrice', this.group2.value.ticketPrice);
    formData.append('imagePath', this.ImagePath);
    formData.append('programId', this.group2.value.programId);
    formData.append('supervisorId',this.group2.value.supervisorId );
    // userCategoriesData.forEach((category, index) => {
    //   console.log(category);
    //    if(category!=0){
    //   formData.append(`UserCategories[${index}]`, category.toString());
    //    }
    // });
    let formIndex = 0;
      userCategoriesData.forEach((category) => {
          if (category !== 0) {
              formData.append(`UserCategories[${formIndex}]`, category.toString());
              formIndex++;
          }
      });
    formData.append('ActivityTypeId', this.group2.value.ActivityTypeId);
    console.log(formData);


      formData.append('Id', '0');
      this.service.activityService.add(formData).subscribe(response=>{
        if(response.statusCode=='200'){
          this.service.toastService.success(response.message)
          this.router.navigate(['admin/activities'])
        }else{
          this.service.toastService.error(response.message);
        }
       },
       (error) => {

       if(error.error.errors.To){
        this.service.toastService.error(error.error.errors.To)
       }
      //  if(error.error.errors.From){
      //   this.service.toastService.error(error.error.errors.From)
      //  }
       if(error.error.errors.Date){
        this.service.toastService.error(error.error.errors.Date)
       }

      })


  }else{
    this.service.toastService.error("افحص المدخلات");
  }
}

  // isDateReadOnly(): boolean {


  //   const currentDate = new Date();

  //   if(this.activity){
  //     const dateT=new Date(this.activity.date)

  //   return currentDate > dateT;
  //   }else{
  //     return false;
  //   }
  // }

  filterSupervisors(){
    this.supervisors = this.supervisorsCopy;
    this.supervisors = this.activityTypes.filter(value => value.displayName.includes(this.supervisorValue));
  }

  selectAllChecked:boolean = false;

  select_all(){
      this.selectAllChecked = !this.selectAllChecked;

      if (this.selectAllChecked) {
          this.userCategoryId.patchValue(this.userCategories.map(category => category.id));
      } else {
          this.userCategoryId.patchValue([]);
      }
  }

}

