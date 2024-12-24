import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { AddCountryComponent } from '../../add-country/add-country.component';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { JsCssLoaderService } from 'src/app/dashboard/services/js-css-loader.service';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements AfterViewInit {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  isLoading2: boolean = false;
  currentImageName: string;
  previousImageName:string;
  currentImageName2: string;
  previousImageName2:string;
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  minWidthDes: number = 600;
  minHeightDes: number = 650;
  textPresetVal: any;
  projects: any[];
  programs: any[];
  id: number
  supervisorValue:string = "";
  supervisorsCopy:any[]=[];
  supervisors:any[]
  supervisorsFilter:any[]
  filterSupervisor:FormGroup = new FormGroup({});
  public dateMoment: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  title:string;
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,private JsCssLoaderService:JsCssLoaderService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddCountryComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }

  async ngOnInit(): Promise<void> {
    // if(this.id){
    //  await this.loadArticle();
    // }
    this.createForm();
    this.loadProjects();
    this.loadSupervisors();
    this.filter.valueChanges.subscribe(newValue => {
      this.projects = this.programs.filter(value => value.title.includes(newValue.filterInput));
    });
    this.filterSupervisor.valueChanges.subscribe(newValue => {
      this.supervisors = this.supervisorsFilter.filter(value => value.displayName.includes(newValue.filterInput2));
    });
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
  filterSupervisors(){
    this.supervisors = this.supervisorsCopy;
    //this.supervisors = this.activityTypes.filter(value => value.displayName.includes(this.supervisorValue));
  }
  // ngAfterViewInit(): void {
  //   this.initializeQuillEditor()
  //   this.textPresetVal = new Choices('#choices-text-preset-values', {
  //     items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
  //   });
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
  createForm() {
    if (this.data) {
      this.title = 'تعديل المقالة'
      this.previousImageName = this.data.imagePath?.split('/').pop();
      this.currentImageName = this.previousImageName;
      this.previousImageName2 = this.data.imageArticle?.split('/').pop();
      this.currentImageName2 = this.previousImageName2;
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
        // Description:[this.data.description,[Validators.required]],
        programId: [this.data.programId, [Validators.required]],
       // ImageFile: [this.data.imagePath, [Validators.required]],
        ArticleImage: [this.data.imageArticle, [Validators.required]],
        AuthorId: [this.data.authorId, [Validators.required]],
        date: [this.data.date, [Validators.required]],
      });
    } else {
      this.title = 'إضافة مقالة'
      this.form = this.service.formBuilder.group({
        Title: ['', [Validators.required]],
        // Description: ['', [Validators.required]],
        // ImageFile: [null, [Validators.required]],
        ArticleImage: [null, [Validators.required]],
        programId: [null, [Validators.required]],
        AuthorId: ['', [Validators.required]],
        date: ['', [Validators.required]],
      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
    this.filterSupervisor=this.service.formBuilder.group({
      filterInput2:['']
    })
  }
  get Title() {
    return this.form.controls['Title'];
  }
  get Description() {
    return this.form.controls['Description'];
  }
  // get ImageFile() {
  //   return this.form.controls['ImagePath'];
  // }
  get ArticleImage() {
    return this.form.controls['ImageArticle'];
  }
  get programId() {
    return this.form.controls['ProgramId'];
  }
  get AuthorId() {
    return this.form.controls['AuthorId'];
  }
  get date() {
    return this.form.controls['date'];
  }
  get filterInput() {
    return this.filter.controls['filterInput'];
  }
  get filterInput2(){
    return  this.filterSupervisor.controls['filterInput2'];
  }

  fileIn: File;
  imageIn:File
  submit() {
    // const values = this.textPresetVal.getValue();

    var post = document.getElementsByClassName('ql-editor')[0].innerHTML;
    console.log(post);
    // console.log(values);


    if (post == '<p><br></p>') {
      this.service.toastService.error('ادخل وصف المقالة مطلوب');
      return;
    }
    console.log(this.form);
    console.log(this.form.valid);
    const selectedDate = new Date(this.form.value.date);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Reset current date time to 00:00:00 for accurate comparison
    selectedDate.setHours(0, 0, 0, 0); // Reset selected date time to 00:00:00 for accurate comparison

    // Check if the selected date is in the past

    if (this.form.valid) {
      const formData = new FormData();
      var dateString = this.form.value.date;
      var dateObject = new Date(dateString);
      var localDate = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000));
      var date = localDate.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
      formData.append('Title', this.form.value.Title);
      formData.append('Description', post);
      //formData.append('ImagePath', this.fileIn);
      formData.append('ImageArticle', this.imageIn);
      formData.append('AuthorId', this.form.value.AuthorId);
      formData.append('ProgramId', this.form.value.programId);
      formData.append('Date', date);
      // formData.append('id', '0');
      if (this.data) {
        formData.append('id', this.data.id);
        this.service.articleService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        // if (selectedDate < currentDate) {
        //   this.service.toastService.error('لا يمكن ادخال تاريخ في الماضي');
        //   return;
        // }
        this.service.articleService.add(formData).subscribe({
          next: (response: ResponseVM) => {
            if (response.statusCode == 200) {
              this.service.toastService.success(response.message);
              this.closeDialog();
            } else {
              this.service.toastService.error(response.message);
            }
          },
          error: (error) => {
            this.service.toastService.error(error);
          }
        })
      }
   }
    else {
      // this.service.toastService.error("افحص كل المطلوب");
      Object.keys(this.form.controls).forEach(key => {
        if (this.form.controls[key].invalid) {
          let fieldName = '';
          switch (key) {
            case 'Title':
              fieldName = 'العنوان';
              break;
            case 'ArticleImage':
              fieldName = 'صورة المقال';
              break;
            case 'AuthorId':
              fieldName = 'المؤلف';
              break;
            case 'programId':
              fieldName = 'البرنامج';
              break;
            case 'date':
              fieldName = 'التاريخ';
              break;

          }
          this.service.toastService.error(`الرجاء ادخال ${fieldName}`);
        }
      });
    }
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
  // onFileSelected(event: any): void {
  //   this.isLoading=true;
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 2000);
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (this.isImageFile(file)) {

  //     this.checkImageDimensions(file).then((dimensions) => {
  //       const [width, height] = dimensions;
  //       if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
  //         this.fileIn = file;
  //         this.currentImageName = file.name;
  //         this.ImageFile.setValue(file.name)

  //       } else {
  //         this.fileIn = null;
  //         this.currentImageName = '';
  //         this.ImageFile.setValue('')
  //         this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
  //       }
  //     })
  //       .catch((error) => {
  //         console.error('Error checking image dimensions:', error);
  //       });


  //   } else {
  //     this.fileIn = null;
  //     this.ImageFile.setValue('')
  //     this.currentImageName = '';
  //     alert('Please select a valid image file.');
  //   }
  // }
  onFileSelected2(event: any): void {
    this.isLoading2=true;
    setTimeout(() => {
      this.isLoading2= false;
    }, 2000);
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isImageFile(file)) {

      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.imageIn = file;
          this.currentImageName2 = file.name;
          this.ArticleImage.setValue(file.name)
          //this.uploadImage2(file);
        } else {
          this.imageIn = null;
          this.ArticleImage.setValue('')
          this.currentImageName2 = '';
          this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
        }
      })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });


    } else {
      this.imageIn = null;
      this.ArticleImage.setValue('')
      this.currentImageName2 = '';
      alert('Please select a valid image file.');
    }
  }
  uploadImage(file: File): void {
    this.isLoading = true;


    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
  uploadImage2(file: File): void {
    this.isLoading2 = true;
    setTimeout(() => {
      this.isLoading2 = false;
    }, 2000);
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
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
  closeDialog(): void {
    this.dialogRef.close();
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


  }
  article: any
  loadArticle() {
    this.service.articleService.getById(this.id).subscribe(response => {
      if (response.statusCode == '200') {

        this.article = response.data;
        this.createForm()
      }
    })
  }
}
