import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddExcellencePrizeComponent } from '../add-excellence-prize/add-excellence-prize.component';
import { CategoryBooksService } from '../../services/category-books.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
// declare const Quill: any;
// declare const Choices: any;
@Component({
  selector: 'app-edit-book-library',
  templateUrl: './edit-book-library.component.html',
  styleUrls: ['./edit-book-library.component.css']
})
export class EditBookLibraryComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  selectedFile: File
  // public dateMoment: moment.Moment;
  // public minDate: moment.Moment;
  // public maxDate: moment.Moment;
  // textPresetVal: any;
  // @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private CategoryBooksService:CategoryBooksService,
    private dialogRef: MatDialogRef<EditBookLibraryComponent>) {
      console.log(this.data);

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
  createForm() {
    if (this.data) {
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, Validators.required],
       Description: [this.data.description, Validators.required],
      Author: [this.data.author, Validators.required],
      PageCount: [this.data.pageCount, [Validators.required, Validators.min(1)]],
      Link: [this.data.link, Validators.required],
      Category: [this.data.category, Validators.required],
      Image: [this.data.image, Validators.required],
      Language: [this.data.language, Validators.required],
      BookCategoryId:[this.data.bookCategoryId, Validators.required],
      QualificationId: [this.data.booksQualification[0].qualificationId, Validators.required],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Title() { return this.form.get('Title'); }
  get Description() { return this.form.get('Description'); }
  get Author() { return this.form.get('Author'); }
  get Language() { return this.form.get('Language'); }
  get PageCount() { return this.form.get('PageCount'); }
  get Link() { return this.form.get('Link'); }
  get Category() { return this.form.get('Category'); }
  get Image() { return this.form.get('Image'); }
  get QualificationId() { return this.form.get('QualificationId'); }
  // onFileSelected2(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.selectedFile = file;
  //     this.form.patchValue({ Image: file });
  //     this.form.get('Image')?.updateValueAndValidity();
  //   }
  // }
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  onFileSelected2(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isImageFile(file)) {
      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.selectedFile = file;
          this.Image.setValue(file.name)
        } else {
          this.selectedFile = null;
          this.Image.setValue('')
          this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
        }
      })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });
    } else {
      this.selectedFile = null;
      this.Image.setValue('')
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
  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  submit(): void {
    // var post = document.getElementsByClassName('ql-editor')[0].innerHTML;

    // if (post == '<p><br></p>') {
    //   this.service.toastService.error('ادخل وصف المجال ');
    //   return;
    // }
    const formData = new FormData();


    formData.append('Title', this.form.value.Title);
     formData.append('Description', this.form.value.Description);
    //formData.append('Description', post);
    formData.append('Author', this.form.value.Author);
    formData.append('PageCount', this.form.value.PageCount);
    formData.append('Link', this.form.value.Link);
    formData.append('Category', this.form.value.Category);
    formData.append('Language', this.form.value.Language);
    formData.append('BookCategoryId', this.form.value.BookCategoryId);
    formData.append('QualificationId', this.form.value.QualificationId);
    formData.append('id', this.data.id);
    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    } else {
      formData.append('Image', null);
    }


    this.CategoryBooksService.update(formData).subscribe({
      next: (response: ResponseVM) => {
        if (response.statusCode ==200) {
          this.service.toastService.success(response.message);
          this.closeDialog();
        } else {
       this.service.toastService.error(response.message);
       }
      },
      error: (error) => {
        this.service.toastService.error(error);
      }
    });
  }
  // private initializeQuillEditor() {
  //   const toolbarOptions = [
  //     // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  //     // [{ "font": [12,15,20,25,30] }],
  //     ['bold', 'underline'],
  //     // ['blockquote', 'code-block'],
  //     // [{ 'header': 1 }, { 'header': 2 }],
  //     // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //     // [{ 'script': 'sub' }, { 'script': 'super' }],
  //     // [{ 'indent': '-1' }, { 'indent': '+1' }],
  //     // [{ 'direction': 'rtl' }],
  //     // [{ 'size': ['small', false, 'large', 'huge'] }],
  //     // [{ 'color': ['red','white','black','yellow','blue','green'] }, { 'background': ['red','white','black','yellow','blue','green'] }],
  //     // [{ 'align': ['rtl','ltr'] }],
  //     // ['image', 'video'],
  //     // ['clean']
  //   ];

  //   const quill = new Quill(this.editorElement.nativeElement, {
  //     modules: {
  //       toolbar: toolbarOptions
  //     },
  //     theme: 'snow'
  //   });


  // }
}
