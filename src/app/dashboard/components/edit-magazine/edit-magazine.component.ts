import { AfterViewChecked, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-edit-magazine',
  templateUrl: './edit-magazine.component.html',
  styleUrls: ['./edit-magazine.component.css']
})
export class EditMagazineComponent  implements OnInit, AfterViewInit {
  imageChanged:boolean = false;
  pdfChanged:boolean = false;
  isOrderVisibale:boolean = false;
  item:any;
  coverImage:any;
  pdfFile:any;
  targetId:number=0;
  orderArray:number[]=[];
  isImageUpdated:boolean = false;
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<EditMagazineComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
    this.targetId = data.id;
    this.loadData();
  }
  ngOnInit(): void {
    this.createForm();
    this.loadData();
  }
  ngAfterViewInit(): void {
    // this.loadData();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      id:[0,[]],
      title:['',[Validators.required]],
      magazineissue:['',[Validators.required]],
      year:['',[Validators.required]],
      numberOfPages:['',[Validators.required]],
      description:['',[Validators.required]],
      pdfPath:[null,[]],
      coverPath:[null,[]],
    });
    this.createForm();
  }
  loadData(){
    this.service.magazineService.getById(this.targetId).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.coverImage=res.data.coverPath;
          this.pdfFile=res.data.pdfPath;
          this.item = res.data;
          this.form.patchValue(res.data);
        }else{
          this.service.toastService.error(res.message);
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
    if(this.imageChanged==true && this.coverPath.value!=null){
      formDataModel.append('coverPath',this.coverPath.value);
    }else{
      formDataModel.append('coverPath',null);
    }
    if(this.pdfChanged==true && this.pdfPath.value!=null){
      formDataModel.append('pdfPath',this.pdfPath.value);
    }else{
      formDataModel.append('pdfPath',null);
    }

    if(this.form.valid){
      this.service.magazineService.update(formDataModel).subscribe({
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
  //    //this.imageChanged = true;
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

    };
    this.coverImage = img.src;
    this.coverPath.setValue(image);
    this.imageChanged = true;

  }
  onMagazinePdfFileSelected(event: any) {
    this.isImageUpdated = true;
    event.preventDefault();
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image,true);
     if(checkResult!=''){
      this.service.toastService.warning(checkResult);
      return;
    }
  //  this.coverImage = URL.createObjectURL(image);
     this.pdfPath.setValue(image);
     this.pdfChanged = true;
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
        return imageError;
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

