import { AfterViewInit, Component, OnInit,Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-edit-kafaat-founder',
  templateUrl: './edit-kafaat-founder.component.html',
  styleUrls: ['./edit-kafaat-founder.component.css']
})
export class EditKafaatFounderComponent implements OnInit, AfterViewInit {
  id:number = 0 ;
  orderArray:number[]=[];
  isOrderVisibale:boolean=false;
  kafaatFounderImage:string='';
  isImageUpdated:boolean = false;
  form:FormGroup = new FormGroup({});
  constructor(private service:MainDashoardService,private dialogRef: MatDialogRef<EditKafaatFounderComponent>,@Inject(MAT_DIALOG_DATA) public data: any){
    this.id = data.id;
    this.orderArray = Array.from({ length: 50 }, (_, index) => index + 1);
  }
  ngAfterViewInit(): void {
    this.loadData();
  }
  ngOnInit(): void {
    this.createForm();
  }
  
  createForm(){
    this.form = this.service.formBuilder.group({
      id:['',[Validators.required]],
      name:['',[Validators.required]],
      position:['',[Validators.required]],
      gender:['',[Validators.required]],
      positionOrder:[0,[Validators.required]],
      imageFile:[null,[]],
    });
  }
  get name(){
    return this.form.controls['name'];
  }
  get position(){
    return this.form.controls['position'];
  }
  get gender(){
    return this.form.controls['gender'];
  }
  get positionOrder(){
    return this.form.controls['positionOrder'];
  }
  get imageFile(){
    return this.form.controls['imageFile'];
  }

  loadData(){
    this.service.kafaatFounderService.getById(this.id).subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.kafaatFounderImage=res.data.imagePath;
          this.isOrderVisibale = res.data.positionOrder>0?true:false;
          this.form.patchValue(res.data);
          // this.imageFile.setValue(res.data.imagePath);
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
  submit() {
    // this.service.printFormValues(this.form);
    let formDataObj = this.service.mapFormValuesToFormData(this.form);
    formDataObj.append('imageFile',this.imageFile.value);
   // debugger;
    if(this.form.valid){
      this.service.kafaatFounderService.update(formDataObj).subscribe({
        next:(response:ResponseVM)=>{
          if(response.statusCode==200){
            this.service.toastService.success(response.message);
            this.closeDialog();
          }else{
            this.service.toastService.error(response.message);
          }
        },
        error:(error)=>{
          this.service.toastService.error(error);
        }
      })
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  onUserImageSelected(event: any) {
    this.isImageUpdated = true;
    event.preventDefault();
    const image = event.target.files[0];
     let checkResult = this.validateUplodedFile(image);
     if(checkResult!=''){
      this.service.toastService.warning(checkResult);
      return;
    }
    this.form.controls['imageFile'].setValue(image);
    this.kafaatFounderImage = URL.createObjectURL(image);
  }
  validateUplodedFile(image:any,isCv:boolean = false):string{
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

    if (isCv) {
      if (fileExtension != "jpg" && fileExtension != "png" && fileExtension != "jpeg" && fileExtension != "pdf") {
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
