import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { VolunteerFieldService } from '../../services/volunteer-field.service';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { VolunteeerFieldService } from '../../services/volunteeer-field.service';
import { JsCssLoaderService } from '../../services/js-css-loader.service';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-volunteer-field',
  templateUrl: './add-volunteer-field.component.html',
  styleUrls: ['./add-volunteer-field.component.css']
})
export class AddVolunteerFieldComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});

  id: number
  public dateMoment: moment.Moment;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  title:string;
  textPresetVal: any;
  isSaveButtonShown: boolean = false
  imageObject = {introductoryFilePath:''};
  introductoryFilePath: string;
  checkResult:any
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,private VolunteeerFieldService:VolunteeerFieldService,private JsCssLoaderService:JsCssLoaderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddVolunteerFieldComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }
  async ngOnInit(): Promise<void> {

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
    if (typeof this.data === 'object') {
      this.title = 'تعديل مجال التطوع'
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
        VolunteerId: [this.data.volunteerId, [Validators.required]],
        Image:[this.data.image, [Validators.required]]
      });
    } else {
      this.title = 'إضافة مجال التطوع'
      this.form = this.service.formBuilder.group({
        Title: ['', [Validators.required]],
        VolunteerId: [this.data, [Validators.required]],
        Image:[null,[Validators.required]]
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
  get Image() {
    return this.form.controls['Image'];
  }
  get VolunteerId() {
    return this.form.controls['VolunteerId'];
  }
  fileIn: File;
  async submit() {

    var post = document.getElementsByClassName('ql-editor')[0].innerHTML;

    if (post == '<p><br></p>') {
      this.service.toastService.error('ادخل وصف المجال ');
      return;
    }

   if(this.form.valid) {
    const formData = new FormData();
    formData.append('Title', this.form.value.Title);
    formData.append('VolunteerId', this.form.value.VolunteerId);
    formData.append('Description', post);
    if (this.fileIn) {
      formData.append('Image', this.fileIn);
    } else {
      formData.append('Image', null);
    }
      if (typeof this.data === 'object') {
        formData.append('id', this.data.id);
        console.log(this.form);
        this.VolunteeerFieldService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {


        this.VolunteeerFieldService.add(formData).subscribe({
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
      console.log(this.form);
      this.service.toastService.error("افحص كل المطلوب");
    }
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
  isClubImage(file: File): boolean {
    return file.type.startsWith('image/');
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isClubImage(file)) {
      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.fileIn = file;
          this.Image.setValue(file.name)
        } else {
          this.fileIn = null;
          this.Image.setValue('')
          this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
        }
      })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });


    } else {
      this.fileIn = null;
      this.Image.setValue('')
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
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;




}
