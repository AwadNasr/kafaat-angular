import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { AddCountryComponent } from '../../add-country/add-country.component';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-writting',
  templateUrl: './add-writting.component.html',
  styleUrls: ['./add-writting.component.css']
})
export class AddWrittingComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  minWidthDes: number = 600;
  minHeightDes: number = 650;
  textPresetVal: any;
  users: any[];
  id: number
  public dateMoment: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  title:string;
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddCountryComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
    console.log(this.data);

  }

  async ngOnInit(): Promise<void> {
    // if(this.id){
    //  await this.loadArticle();
    // }
    this.createForm();
    this.loadWritters();
  }

  ngAfterViewInit(): void {
    this.initializeQuillEditor()
    this.textPresetVal = new Choices('#choices-text-preset-values', {
      items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
    });
  }
  createForm() {
    if (this.data) {
      console.log(this.data);
      this.title = 'تعديل مؤَلف'
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
        // Description:[this.data.description,[Validators.required]],
        UserId: [this.data.userId, [Validators.required]],
        PublishImage: [this.data.publishImage, [Validators.required]],
        PublishingHouse: [this.data.publishingHouse, [Validators.required]],
        date: [this.data.publishDate, [Validators.required]],
      });
    } else {
      this.title = 'إضافة مؤَلف'
      this.form = this.service.formBuilder.group({
        Title: ['', [Validators.required]],
        // Description: ['', [Validators.required]],
        PublishImage: [null, [Validators.required]],
        UserId: [null, [Validators.required]],
        PublishingHouse: ['', [Validators.required]],
        date: ['', [Validators.required]],
      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Title() {
    return this.form.controls['Title'];
  }
  get Description() {
    return this.form.controls['Description'];
  }
  get PublishImage() {
    return this.form.controls['PublishImage'];
  }
  get UserId() {
    return this.form.controls['UserId'];
  }
  get PublishingHouse() {
    return this.form.controls['PublishingHouse'];
  }
  get date() {
    return this.form.controls['date'];
  }
  get filterInput() {
    return this.filter.controls['filterInput'];
  }

  fileIn: File;
  submit() {
    // const values = this.textPresetVal.getValue();

    var post = document.getElementsByClassName('ql-editor')[0].innerHTML;

    if (post == '<p><br></p>') {
      this.service.toastService.error('ادخل وصف المؤَلف مطلوب');
      return;
    }

    if (this.form.valid) {
      const formData = new FormData();
      var dateString = this.form.value.date;


      var dateObject = new Date(dateString);
      var localDate = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000));
      var date = localDate.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
      formData.append('Title', this.form.value.Title);
      formData.append('Description', post);
      formData.append('PublishImage', this.fileIn);
      formData.append('PublishingHouse', this.form.value.PublishingHouse);
      formData.append('UserId', this.form.value.UserId);
      formData.append('PublishDate', date);
      // formData.append('id', '0');
      if (this.data) {
        formData.append('id', this.data.id);
        this.service.writtingService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.service.writtingService.add(formData).subscribe({
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
  loadWritters() {
    this.service.accountService.getAll().subscribe(response => {
      if (response.statusCode == "200") {
        this.users = response.data;
      }
    }

    );
  }
  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isPublishImage(file)) {

      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.fileIn = file;
          this.PublishImage.setValue(file.name)
        } else {
          this.fileIn = null;
          this.PublishImage.setValue('')
          this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
        }
      })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });


    } else {
      this.fileIn = null;
      this.PublishImage.setValue('')
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
  isPublishImage(file: File): boolean {
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
  writting: any
  loadArticle() {
    this.service.writtingService.getById(this.id).subscribe(response => {
      if (response.statusCode == '200') {

        this.writting = response.data;
        this.createForm()
      }
    })
  }
}
