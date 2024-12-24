import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddCountryComponent } from '../add-country/add-country.component';
import { ReadClubService } from '../../services/read-club.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { JsCssLoaderService } from '../../services/js-css-loader.service';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-read-club',
  templateUrl: './add-read-club.component.html',
  styleUrls: ['./add-read-club.component.css']
})
export class AddReadClubComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  minWidthDes: number = 600;
  minHeightDes: number = 650;
  textPresetVal: any;
  id: number
  public dateMoment: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  title:string;
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,private JsCssLoaderService:JsCssLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddReadClubComponent>,private ReadClubService:ReadClubService) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }
   ngOnInit(){
    this.createForm();
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
      console.log(this.data);

      this.title = 'تعديل النادي'
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
        Description:[this.data.description],
        ClubImage: [this.data.clubImage, [Validators.required]],
        Reader: [this.data.reader, [Validators.required]],
        Books: [this.data.books, [Validators.required]],
        Benefits: [this.data.benefits, [Validators.required]],
        Report: [this.data.report],
        Date: [this.data.date, [Validators.required]],


      });
    } else {
      this.title = 'إضافة النادي'
      this.form = this.service.formBuilder.group({
        Title: ['', [Validators.required]],
        Description: [''],
        ClubImage: [null, [Validators.required]],
        Reader: [0, [Validators.required]],
        Books: [0, [Validators.required]],
        Benefits: [0, [Validators.required]],
        Report: [null],
        Date: ['', [Validators.required]],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Title() {
    return this.form.controls['Title'];
  }
  // get Description() {
  //   return this.form.controls['Description'];
  // }
  get ClubImage() {
    return this.form.controls['ClubImage'];
  }
  get Report() {
    return this.form.controls['Report'];
  }
  get Reader() {
    return this.form.controls['Reader'];
  }
  get Books() {
    return this.form.controls['Books'];
  }
  get Benefits() {
    return this.form.controls['Benefits'];
  }
  get Date() {
    return this.form.controls['Date'];
  }
  fileIn: File;
  selectedFile:File;
  submit() {


    var post = document.getElementsByClassName('ql-editor')[0].innerHTML;

    if (post == '<p><br></p>') {
      this.service.toastService.error('ادخل وصف النادي مطلوب');
      return;
    }

    if (this.form.valid) {
      const formData = new FormData();

      var dateString = this.form.value.Date;
      var dateObject = new Date(dateString);
      var localDate = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000));
      var date = localDate.toISOString().slice(0, 19).replace("T", " ") + ".0000000";

      formData.append('Title', this.form.value.Title);
      formData.append('Description', post);

      formData.append('Date', date);
      formData.append('Reader', this.form.value.Reader);
      formData.append('Books', this.form.value.Books);
      formData.append('Benefits', this.form.value.Benefits);
      if (this.fileIn) {
        formData.append('ClubImage', this.fileIn);
      } else {
        formData.append('ClubImage', null);
      }
      if (this.selectedFile) {
        formData.append('Report', this.selectedFile);
      } else {
        formData.append('Report', null);
      }
      if (this.data) {
        formData.append('id', this.data.id);


        this.ReadClubService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {

        this.ReadClubService.add(formData).subscribe({
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
      this.service.toastService.error("افحص كل المطلوب");
    }
  }
  isClubImage(file: File): boolean {
    return file.type.startsWith('image/');
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isClubImage(file)) {
      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.fileIn = file;
          this.ClubImage.setValue(file.name)
        } else {
          this.fileIn = null;
          this.ClubImage.setValue('')
          this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
        }
      })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });


    } else {
      this.fileIn = null;
      this.ClubImage.setValue('')
      alert('Please select a valid image file.');
    }
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
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.patchValue({ Report: file });
      this.form.get('Report')?.updateValueAndValidity();
    }
  }
}
