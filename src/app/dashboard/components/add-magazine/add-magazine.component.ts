import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-add-magazine',
  templateUrl: './add-magazine.component.html',
  styleUrls: ['./add-magazine.component.css']
})
export class AddMagazineComponent  implements OnInit {
  isLoading: boolean = false; // Add this line
  isOrderVisibale:boolean = false;
  coverImage:string = "/assets/images/default.svg";
  pdfFile:any;
  orderArray:number[]=[];
  isImageUpdated:boolean = false;
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<AddMagazineComponent>){
    this.orderArray = Array.from({ length: 50 }, (_, index) => index + 1);
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      id:[0,[]],
      title:['',[Validators.required]],
      magazineissue:['',[Validators.required]],
      year:['',[Validators.required]],
      numberOfPages:['',[Validators.required]],
      description:['',[Validators.required]],
      pdfPath:['',[Validators.required]],
      coverPath:['',[Validators.required]],
    });
  }
 get id(){
  return this.form.controls['id'];
 }
 get title(){
  return this.form.controls['title'];
 }
 get year(){
  return this.form.controls['year'];
 }
 get numberOfPages(){
  return this.form.controls['numberOfPages'];
 }
 get magazineissue(){
  return this.form.controls['magazineissue'];
 }
 get pdfPath(){
  return this.form.controls['pdfPath'];
 }
 get coverPath(){
  return this.form.controls['coverPath'];
 }
 get description(){
  return this.form.controls['description'];
 }

  submit() {

    // this.service.printFormValues(this.form);
    if(!this.form.valid){
      this.form.markAllAsTouched();
    }
    let formDataModel = this.service.mapFormValuesToFormData(this.form);
    if(this.coverPath.value == null || this.pdfPath.value == null ){
      return;
    }else{
      formDataModel.append('coverPath',this.coverPath.value);
      formDataModel.append('pdfPath',this.pdfPath.value);
    }

    if(this.form.valid){
      this.service.magazineService.add(formDataModel).subscribe({
        next:(response:ResponseVM)=>{

          if(response.statusCode==200){
            this.service.toastService.success(response.message);
            this.closeDialog();
          }else{
            this.service.toastService.error(response.message);
          }
        },
        error:(error)=>{
          let errorMessage = 'حدث خطأ غير متوقع';
          if (error.error && typeof error.error === 'string') {
            errorMessage = error.error; // Use the error message from the 'error' property
          } else if (error.message) {
            errorMessage = error.message; // Use the 'message' property if available
          }
          this.service.toastService.error(errorMessage);
        }
      })
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  // onCoverImageSelected(event: any) {
  //   this.isImageUpdated = true;
  //   event.preventDefault();
  //   const image = event.target.files[0];
  //    let checkResult = this.validateUplodedFile(image);
  //    if(checkResult!=''){
  //     this.service.toastService.warning(checkResult);
  //     return;
  //   }
  //   this.coverImage = URL.createObjectURL(image);
  //    this.coverPath.setValue(image);
  // }
  onCoverImageSelected(event: any) {
    this.isImageUpdated = true;
    event.preventDefault();
    const image = event.target.files[0];

    // Validate the uploaded file (extension, size, etc.)
    let checkResult = this.validateUplodedFile(image);
    if (checkResult != '') {
      this.service.toastService.warning(checkResult);
      return;
    }

    // Create an image element to check dimensions
    const img = new Image();
    img.src = URL.createObjectURL(image);

    img.onload = () => {
      // Check if the image dimensions are 850x550
      if (img.width < 750) {
        this.service.toastService.warning('صورة الغلاف يجب ان لا تقل عن عرض 750px');
      }

      // If dimensions are correct, proceed to update the cover image
      this.coverImage = img.src;
      this.coverPath.setValue(image);
    };
  }

  onMagazinePdfFileSelected(event: any) {
    this.isLoading = true; // Show the loading bar
 setTimeout(() => {
      //this.pdfPath.setValue(image);
      this.isLoading = false;
    }, 2000);
    this.isImageUpdated = true;
    event.preventDefault();
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image,true);
     if(checkResult!=''){
      this.isLoading = false;

      this.service.toastService.warning(checkResult);
      return;
    }

    //this.coverImage = URL.createObjectURL(image);
     this.pdfPath.setValue(image);
  }
  validateUplodedFile(image:any,isPDF:boolean = false):string{
    let imageError = "";
    let maxLimitedSize = 1024*1024*10;
    let _fileSize = image.size;  //in MB
    // if(_fileSize>maxLimitedSize){
    //   imageError = "حجم الملف يتجاوز الحد المسموح به";
    //   return imageError;
    // }
    let fileName = image.name;
     let fileArray:String = fileName.replace(' ','').split(".");
     let fileExtension = fileArray[fileArray.length-1].toLowerCase().toString();
    //  debugger;
    if (isPDF) {
      if (fileExtension != "docx" && fileExtension != "pdf") {
        imageError = "نوع الملف  غير مسموح به";
        this.pdfPath.setErrors({ 'invalidFileType': imageError });
        return imageError;
      }else{
        this.pdfPath.setErrors(null);
      }
    }
    else {
      if (fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg") {
        imageError = "نوع الملف  غير مسموح به";
        return imageError;
      }
    }
    return imageError;
  }
}
