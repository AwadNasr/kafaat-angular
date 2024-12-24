import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PagedRequest } from 'src/app/kafaat/core/models/paged-request';
import { PagedResponse } from 'src/app/kafaat/core/models/paged-response';

@Component({
  selector: 'app-add-magazine-pages',
  templateUrl: './add-magazine-pages.component.html',
  styleUrls: ['./add-magazine-pages.component.css']
})
export class AddMagazinePagesComponent implements OnInit,OnDestroy{
    wholeNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const isValid = Number.isInteger(Number(value));
      return isValid ? null : { fractionalNumber: true };
    };
  }
  targetId:any;
  item:any;
  private routeSubscription: Subscription = new Subscription();
  itemImg:string = "/assets/images/default.svg";
  formBuilder = inject(FormBuilder);
  form:FormGroup = new FormGroup({});
  formErrors:any[]=[];
  pageResponse:PagedResponse={page:1,pageSize:10,totalCount:0,hasNextPage:false,hasPreviousPage:false,items:[]};
  pagedRequest:PagedRequest = { pageNumber: 1, pageSize: 500, name: "", id: 0, type: 0 };
  constructor(private service:MainDashoardService,private activatedRoute:ActivatedRoute){
    this.routeSubscription = this.activatedRoute.paramMap.subscribe(param=>{
      this.targetId = Number(param.get("id"));
      this.pagedRequest.id = this.targetId;
    //  this.service.magazinePageService.getPage(this.pagedRequest).subscribe({
    //   next:(res:PagedResponse)=>{
    //      this.counter=res.totalCount
    //       console.log(this.counter);
    //       this.getcounter()
    //   }
    // });


    });
  }
  ngOnInit(): void {
    this.createForm();
    this.addPage();
    this.getItem();
  }
  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
  createForm(){
    this.form = this.service.formBuilder.group({
      magazineId:[this.targetId,[Validators.required]],
      pages: this.formBuilder.array([]),
    });
  }
  get magazineId(){
    return this.form.controls['magazineId'];
  }
  get pages(){
    return this.form.controls['pages'] as FormArray;
  }
back(){
  this.service.back;
}

submit(){
  this.magazineId.setValue(this.targetId);
  if(!this.form.valid){
    this.form.markAllAsTouched();
    this.service.markAllFormArrayControlsAsTouched(this.pages);
    this.formErrors = this.service.getFormErrors(this.form);
    this.service.toastService.warning("من فضلك اكمل البيانات");
    return;
  }
  let model = this.mapDataIntoFormData();

  // let model = this.copyFormInNewForm();
  this.service.magazinePageService.add(model).subscribe({
    next:(res:ResponseVM)=>{
      if(res.statusCode == 200){
        this.service.toastService.success(res.message);
        // this.closeDialog(); TODO : Back Here
        this.back();
      }else{
        this.service.toastService.error(res.message);
      }
    }
  });
}
getItem(){
  this.service.magazineService.getById(this.targetId).subscribe({
    next:(res:ResponseVM)=>{
      if(res.statusCode==200){
        this.item = res.data;
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
counter:number=0;
// addPage() {
// console.log(this.getcounter());


//   let pageNo = Number(this.getValuForLastPageNumber);

//   const page = this.formBuilder.group({
//     id: 0,
//     imagePath: ['',[Validators.required]],
//     pageNumber: [pageNo, [Validators.required, this.wholeNumberValidator()]],
//     imagePreview: [''],  // Add imagePreview here
//     magazineId: [this.targetId,[Validators.required]]
//   });
//   this.pages.push(page);
// }
addPage() {
  this.getcounter().then(() => {
    let pageNo = this.counter+1;

    const page = this.formBuilder.group({
      id: 0,
      imagePath: ['', [Validators.required]],
      pageNumber: [pageNo, [Validators.required, this.wholeNumberValidator()]],
      imagePreview: [''],
      magazineId: [this.targetId, [Validators.required]]
    });
    this.pages.push(page);

  });
}
addPage1(){


  let pageNo = this.counter+2;
  const page = this.formBuilder.group({
    id: 0,
    imagePath: ['', [Validators.required]],
    pageNumber: [pageNo, [Validators.required, this.wholeNumberValidator()]],
    imagePreview: [''],
    magazineId: [this.targetId, [Validators.required]]
  });
  this.pages.push(page);
this.counter++;
}
 get getValuForLastPageNumber() {

    let value = 1;
    const lastIndex = this.pages.length - 1;

    if (lastIndex >= 0) {
      const lastPageNumber = this.pages.at(lastIndex).get('pageNumber').value;
      value = Number(lastPageNumber)+1;
    } else {
      value = 1;
    }
    return value;
  }
removePage(index: number) {
  this.pages.removeAt(index);
}
getcounter(): Promise<void> {
  return new Promise((resolve, reject) => {
    this.service.magazinePageService.getPage(this.pagedRequest).subscribe({
      next: (res: PagedResponse) => {
        this.counter = res.totalCount;
        console.log(this.counter);
        resolve(); // Resolve the promise when the counter is set
      },
      error: (error) => {
        let errorMessage = 'حدث خطأ غير متوقع';
        if (error.error && typeof error.error === 'string') {
          errorMessage = error.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.service.toastService.error(errorMessage);
        reject(errorMessage); // Reject in case of error
      }
    });
  });
}

// onMagazinePageChangeImage(event: any,index:any) {
//   event.preventDefault();
//   const image = event.target.files[0];
//    let checkResult = this.validateUplodedFile(image,false);
//    if(checkResult!=''){
//     this.service.toastService.warning(checkResult);
//     return;
//   }
//   this.pages.at(index).get('imagePath').setValue(image);
// }
onMagazinePageChangeImage(event: any, index: any) {
  event.preventDefault();
  const image = event.target.files[0];
  let checkResult = this.validateUplodedFile(image, false);
  if (checkResult != '') {
    this.service.toastService.warning(checkResult);
    return;
  }
  const imageUrl = URL.createObjectURL(image);
  this.pages.at(index).get('imagePath').setValue(image);
  this.pages.at(index).get('imagePreview').setValue(imageUrl);
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
mapDataIntoFormData(){
  const formData = new FormData();
  let getMagazinePageControlsArray = this.createMagazinePageItems(this.pages.value);
  for (let i = 0; i < getMagazinePageControlsArray.length; i++) {
    const object = getMagazinePageControlsArray[i];
    formData.append('pages[' + i + '].id', object.id);
    formData.append('pages[' + i + '].imagePath', object.imagePath);
    formData.append('pages[' + i + '].pageNumber', object.pageNumber);
    formData.append('pages[' + i + '].magazineId', object.magazineId);
  }
    formData.append('magazineId', this.magazineId.value.toString());
 return formData;
}

createMagazinePageItems(pages:any[],): any[] {
  let formForArrayControls = this.formBuilder.nonNullable.group({
    pages:this.formBuilder.array([]),
  });
  const magazinePageControlsWithData = pages.map(item => this.formBuilder.control(item));
  let magazinePageFormArray = formForArrayControls.get('pages') as FormArray;
  magazinePageFormArray.controls = magazinePageControlsWithData;
  let formRawData = formForArrayControls.getRawValue();
  return formRawData.pages;
}
}
