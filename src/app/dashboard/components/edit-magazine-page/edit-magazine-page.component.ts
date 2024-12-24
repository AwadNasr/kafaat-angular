import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-edit-magazine-page',
  templateUrl: './edit-magazine-page.component.html',
  styleUrls: ['./edit-magazine-page.component.css']
})
export class EditMagazinePageComponent  implements OnInit, AfterViewInit {
  wholeNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = Number.isInteger(Number(value));
      return isValid ? null : { fractionalNumber: true };
    };
  }
  imageChanged:boolean = false;
  pdfChanged:boolean = false;
  isOrderVisibale:boolean = false;
  item:any;
  imagePathImage:any;
  targetId:number=0;
  orderArray:number[]=[];
  isImageUpdated:boolean = false;
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<EditMagazinePageComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
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
      pageNumber:['',[Validators.required, this.wholeNumberValidator()]],
      magazineId:['',[Validators.required]],
      imagePath:[null,[]],
    });
    this.createForm();
  }

  loadData(){
    this.service.magazinePageService.getById(this.targetId).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.imagePathImage=res.data.imagePath;
          this.item = res.data;
          this.imagePath.setValue(res.data.imagePath);
          this.pageNumber.setValue(res.data.pageNumber);
          this.id.setValue(res.data.id);
          this.magazineId.setValue(res.data.magazineId);
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
  get pageNumber(){
    return this.form.controls['pageNumber'];
  }
  get magazineId(){
    return this.form.controls['magazineId'];
  }
  get imagePath(){
    return this.form.controls['imagePath'];
  }
  submit() {
    // this.service.printFormValues(this.form);
    if(!this.form.valid){
      this.form.markAllAsTouched();
    }
    let formDataModel = this.service.mapFormValuesToFormData(this.form);
    if(this.imageChanged==true && this.imagePath.value!=null){
      formDataModel.append('imagePath',this.imagePath.value);
    }else{
      formDataModel.append('imagePath',null);
    }
    if(this.form.valid){
      this.service.magazinePageService.update(formDataModel).subscribe({
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
  onCoverImageSelected(event: any) {
    this.isImageUpdated = true;
    event.preventDefault();
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image);
     if(checkResult!=''){
      this.service.toastService.warning(checkResult);
      return;
    }
    this.imagePathImage = URL.createObjectURL(image);
     this.imagePath.setValue(image);
     this.imageChanged = true;
  }
  validateUplodedFile(image:any,isPDF:boolean = false):string{
    let imageError = "";
    let maxLimitedSize = 1024*1024*10;
    let _fileSize = image.size;  //in MB
    if(_fileSize>maxLimitedSize){
      imageError = "حجم الملف يتجاوز الحد المسموح به";
      return imageError;
    }
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

