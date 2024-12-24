import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { CategoryBooksService } from '../../services/category-books.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// declare const Quill: any;
// declare const Choices: any;
@Component({
  selector: 'app-add-book-library',
  templateUrl: './add-book-library.component.html',
  styleUrls: ['./add-book-library.component.css']
})
export class AddBookLibraryComponent {
  form: FormGroup = new FormGroup({});
  BookId:any;
  selectedFile: File | null = null;
  // public dateMoment: moment.Moment;
  // public minDate: moment.Moment;
  // public maxDate: moment.Moment;
  // textPresetVal: any;
  // @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private route: ActivatedRoute,private service:MainDashoardService,private CategoryBooksService:CategoryBooksService
    ,private dialogRef: MatDialogRef<AddBookLibraryComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
   this.BookId=data
   console.log(this.BookId);

  }
  ngOnInit(): void {
    this.createForm();
  }
  // ngAfterViewInit(): void {
  //   this.initializeQuillEditor()
  //   this.textPresetVal = new Choices('#choices-text-preset-values', {
  //     items: this.data != null ? this.data.objectives.map((e: any) => e.name) : []
  //   });
  // }
  createForm() {
    this.form = this.service.formBuilder.group({
      Title: ['', Validators.required],
       Description: ['', Validators.required],
      Author: ['', Validators.required],
      PageCount: ['', [Validators.required, Validators.min(1)]],
      Link: ['', Validators.required],
      Category: ['', Validators.required],
      Image: [null, Validators.required],
      Language: ['', Validators.required],
      BookCategoryId:[this.BookId, Validators.required],
      QualificationId: ['', Validators.required],

    });
}
get Title() { return this.form.get('Title'); }
  get Description() { return this.form.get('Description'); }
  get Author() { return this.form.get('Author'); }
  get PageCount() { return this.form.get('PageCount'); }
  get Link() { return this.form.get('Link'); }
  get Category() { return this.form.get('Category'); }
  get Language() { return this.form.get('Language'); }
  get Image() { return this.form.get('Image'); }
  get QualificationId() { return this.form.get('QualificationId'); }




  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.form.patchValue({ Image: file });
      this.form.get('Image')?.updateValueAndValidity();
    }
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


    if (this.selectedFile) {
      formData.append('Image', this.selectedFile);
    }
    this.CategoryBooksService.add(formData).subscribe({
      next: (response: ResponseVM) => {
        if (response.message === "تم إضافة الكتاب والمؤهلات بنجاح") {
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




  closeDialog(): void {
    this.dialogRef.close();
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
