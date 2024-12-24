import { Location } from '@angular/common';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddReadClubComponent } from '../add-read-club/add-read-club.component';
import { ReadingClubTripsService } from '../../services/reading-club-trips.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
declare const Quill: any;
declare const Choices: any;
@Component({
  selector: 'app-add-reading-club-trip',
  templateUrl: './add-reading-club-trip.component.html',
  styleUrls: ['./add-reading-club-trip.component.css']
})
export class AddReadingClubTripComponent {
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
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddReadClubComponent>,private ReadingClubTripsService:ReadingClubTripsService) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }
  ngOnInit(){
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.initializeQuillEditor()
    this.textPresetVal = new Choices('#choices-text-preset-values', {
      items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
    });
  }
  createForm() {
    if (typeof this.data === 'object') {


      this.title = 'تعديل النادي'
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
        Description:[this.data.description],
        ClubImage: [this.data.clubImage, [Validators.required]],
        Reader: [this.data.reader, [Validators.required]],
        Books: [this.data.books, [Validators.required]],
        Benefits: [this.data.benefits, [Validators.required]],
        Location: [this.data.location, [Validators.required]],
        Date: [this.data.date, [Validators.required]],
        ReadClubId: [this.data.readClubId, [Validators.required]],
        Report: [this.data.report],


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
        Location: ['', [Validators.required]],
        Date: [null, [Validators.required]],
        ReadClubId: [this.data, [Validators.required]],
        Report: [null],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Title() {
    return this.form.controls['Title'];
  }

  get ClubImage() {
    return this.form.controls['ClubImage'];
  }
  get Reader() {
    return this.form.controls['Reader'];
  }
  get Report() {
    return this.form.controls['Report'];
  }
  get Books() {
    return this.form.controls['Books'];
  }
  get Benefits() {
    return this.form.controls['Benefits'];
  }
  get Location() {
    return this.form.controls['Location'];
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
      formData.append('Title', this.form.value.Title);
      formData.append('Description', post);
     // formData.append('ClubImage', this.fileIn);
      formData.append('Reader', this.form.value.Reader);
      formData.append('Books', this.form.value.Books);
      formData.append('Benefits', this.form.value.Benefits);
      formData.append('Location', this.form.value.Location);
      formData.append('Date', this.form.value.Date);
      formData.append('ReadClubId', this.form.value.ReadClubId);
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
      if (typeof this.data === 'object') {
        formData.append('id', this.data.id);
        this.ReadingClubTripsService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.ReadingClubTripsService.add(formData).subscribe({
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
