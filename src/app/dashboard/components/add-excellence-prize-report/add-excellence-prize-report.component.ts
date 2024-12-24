import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ExcellencePrizeReportService } from './../../services/excellence-prize-report.service';
import { Component, Inject } from '@angular/core';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-excellence-prize-report',
  templateUrl: './add-excellence-prize-report.component.html',
  styleUrls: ['./add-excellence-prize-report.component.css']
})
export class AddExcellencePrizeReportComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  id: number
  checkResult:any
  fileIn: File;
  title:string;
  isSaveButtonShown: boolean = false
  imageObject = {introductoryFilePath:''};
  introductoryFilePath: string;
  homeVideoPath: string;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddExcellencePrizeReportComponent>,public ExcellencePrizeReportService:ExcellencePrizeReportService,) {
    this.id=this.data
console.log(this.id);

  }
   ngOnInit():void {
    this.createForm();
  }
  createForm() {
    if (this.data && typeof this.data === 'object') {
      console.log(this.data);
      this.title = 'تعديل تقرير الجائزة'
      this.form = this.service.formBuilder.group({
        Name: [this.data.name, [Validators.required]],
        ExcellencePrizeId:[this.data.id, [Validators.required]],
        // reportFile: [this.data.reportFile, [Validators.required]],
      });
    } else {
      this.title = 'إضافة تقرير الجائزة'
      this.form = this.service.formBuilder.group({
        Name: ['', [Validators.required]],
        ExcellencePrizeId:[this.id, [Validators.required]],
        // reportFile: [null, [Validators.required]],

      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Name() {
    return this.form.controls['Name'];
  }
  submit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('Name', this.form.value.Name);
      formData.append('ExcellencePrizeId', this.form.value.ExcellencePrizeId);
      formData.append('ReportPath', this.uploadedFile);
      if (this.data && typeof this.data === 'object') {
        formData.append('id', this.data.id);
        this.ExcellencePrizeReportService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.ExcellencePrizeReportService.add(formData).subscribe({
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
  closeDialog(): void {
    this.dialogRef.close();
  }
  uploadedFile: File;
  onChangeFile(event: any,fieldName:string,type:string) {
    event.preventDefault();
    this.isSaveButtonShown=true;
     this.uploadedFile = event.target.files[0];
      this.checkResult = this.validateUplodedFile(this.uploadedFile) ;
     if(this.checkResult!=''){
      this.service.toastService.warning(this.checkResult);
      return;
    }
    this.introductoryFilePath = URL.createObjectURL(this.uploadedFile);
  }
  validateUplodedFile(image:any):string{
    let fileError = "";
    let maxLimitedSize = 1024 * 1024 * 30;
    let _fileSize = image.size;  //in MB
    if (_fileSize > maxLimitedSize) {
      fileError = " حجم الملف يتجاوز الحد المسموح به و هو 30 ميجا بايت";
      return fileError;
    }
    let fileName = image.name;
    let fileArray: String = fileName.replace(' ', '').split(".");
    let fileExtension = fileArray[fileArray.length - 1].toLowerCase().toString();

    if (fileExtension != "pdf") {
      fileError = "نوع الملف  المسموح به نوع الـ PDF فقط";
      return fileError;
    }

    return fileError;
  }
}
