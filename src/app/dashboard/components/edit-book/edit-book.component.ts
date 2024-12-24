import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ReadingClubBookServiceService } from '../../services/reading-club-book-service.service';
import { FormGroup, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  id: number;
  form: FormGroup = new FormGroup({});
  bookImagePreview: string | ArrayBuffer | null = null;

  imageChanged:boolean = false;


  constructor(
    private service: MainDashoardService,
    private dialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readingClubBook: ReadingClubBookServiceService
  ) {
    console.log(data);

    this.id =data;
  }

  ngOnInit(): void {
    this.createForm();
    this.loadData();  // Load data as soon as the component initializes
  }
readingClubId:number
loadData(): void {
  this.readingClubBook.getById(this.id).subscribe({
    next: (res: any) => {
      if (res.statusCode === 200) {
        this.form.patchValue({
          title: res.data.title,
          description: res.data.description,
          bookImage: null
        });
        this.readingClubId = res.data.readingClubId;
        this.bookImagePreview = res.data.bookImage; // Assuming bookImage is a URL to the image
      } else {
        this.service.toastService.error(res.error);
      }
    },
    error: (error) => {
      this.service.toastService.error(error.error);
    }
  });
}

  createForm(): void {
    this.form = this.service.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      //readingClubId: [this.readingClubId, [Validators.required]],

      bookImage: [null]
    });
  }

  // onFileSelected(event: any): void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.form.patchValue({ bookImage: file });

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.bookImagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }
  onFileSelected(event: any): void {
    this.imageChanged = true;
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ bookImage: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.bookImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  submit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('readingClubId', this.readingClubId.toString());
      formData.append('id', this.id.toString());
      if (this.imageChanged) {
        const bookImage = this.form.get('bookImage')?.value;
        if (bookImage) {
          formData.append('bookImage', bookImage, bookImage.name);
        }
      }

      this.readingClubBook.update(formData).subscribe({
        next: (response: any) => {
          if (response.statusCode === 200) {
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
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  // id:number;
  // form:FormGroup = new FormGroup({});
  // constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<EditBookComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private readingClubBook:ReadingClubBookServiceService) {
  //   this.id = data;
  // }
  // ngAfterViewInit(): void {
  //   this.loadData();
  // }
  // ngOnInit(): void {
  //   this.createForm();
  // }
  // loadData(){
  //   this.readingClubBook.getById(this.id).subscribe({
  //     next:(res:ResponseVM)=>{
  //       if(res.statusCode==200){
  //         this.form.patchValue(res.data);
  //       }else{
  //         this.service.toastService.error(res.error);
  //       }
  //     },
  //     error:(error)=>{
  //       this.service.toastService.error(error.error);
  //     }
  //   })
  // }

  // createForm(){
  //   this.form = this.service.formBuilder.group({
  //     title: ['', [Validators.required]],
  //     description: ['', [Validators.required]],
  //     readingClubId: [this.id, [Validators.required]],
  //     bookImage: [null,[Validators.required]]

  //   });
  // }
  // submit() {
  //   // this.service.printFormValues(this.form);
  //   if(this.form.valid){
  //     this.readingClubBook.update(this.form.value).subscribe({
  //       next:(response:ResponseVM)=>{
  //         if(response.statusCode==200){
  //           this.service.toastService.success(response.message);
  //           this.closeDialog();
  //         }else{
  //           this.service.toastService.error(response.message);
  //         }
  //       },
  //       error:(error)=>{
  //         this.service.toastService.error(error);
  //       }
  //     })
  //   }
  // }
  // closeDialog(): void {
  //   this.dialogRef.close();
  // }
}
