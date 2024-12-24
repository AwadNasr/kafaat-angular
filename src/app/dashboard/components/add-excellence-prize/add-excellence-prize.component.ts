import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-excellence-prize',
  templateUrl: './add-excellence-prize.component.html',
  styleUrls: ['./add-excellence-prize.component.css']
})
export class AddExcellencePrizeComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  id: number
  title:string;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private excellencePrizeService:ExcellencePrizeService,
    private dialogRef: MatDialogRef<AddExcellencePrizeComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];

    });
  }
  ngOnInit(){
    this.createForm();
  }
  createForm() {
    if (this.data) {
      this.title = 'تعديل جائزة التفوق'
      this.form = this.service.formBuilder.group({
        Name: [this.data.name, [Validators.required]],
        Description:[this.data.description,[Validators.required]],
        PrizeImage: [this.data.prizeImage, [Validators.required]],
        ApplicationStartDate: [this.data.applicationStartDate, [Validators.required]],
        ApplicationEndDate: [this.data.applicationEndDate, [Validators.required]],
      });
    } else {
      this.title = 'إضافة جائزة التفوق'
      this.form = this.service.formBuilder.group({
        Name: ['', [Validators.required]],
        Description:['',[Validators.required]],
        PrizeImage: [null, [Validators.required]],
        ApplicationStartDate: ['', [Validators.required]],
        ApplicationEndDate: ['', [Validators.required]],
      });
    }

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Name() {
    return this.form.controls['Name'];
  }
  get Description() {
    return this.form.controls['Description'];
  }
  get PrizeImage() {
    return this.form.controls['PrizeImage'];
  }
  get ApplicationStartDate() {
    return this.form.controls['ApplicationStartDate'];
  }
  get ApplicationEndDate() {
    return this.filter.controls['ApplicationEndDate'];
  }
  get filterInput() {
    return this.filter.controls['filterInput'];
  }
  imageIn:File
  submit() {

    console.log(this.form.valid);

    if (this.form.valid) {
      const formData = new FormData();
      var dateString = this.form.value.ApplicationStartDate;
      var dateObject = new Date(dateString);
      var localDate = new Date(dateObject.getTime() - (dateObject.getTimezoneOffset() * 60000));
      var date = localDate.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
      //
      var dateString1 = this.form.value.ApplicationEndDate;
      var dateObject1 = new Date(dateString1);
      var localDate1 = new Date(dateObject1.getTime() - (dateObject1.getTimezoneOffset() * 60000));
      var date1 = localDate1.toISOString().slice(0, 19).replace("T", " ") + ".0000000";
      //
      formData.append('Name', this.form.value.Name);
      formData.append('Description',  this.form.value.Description);
      formData.append('PrizeImage', this.imageIn);
      formData.append('ApplicationStartDate', date);
      formData.append('ApplicationEndDate', date1);
      // formData.append('id', '0');
      if (this.data) {
        formData.append('id', this.data.id);
        this.excellencePrizeService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.excellencePrizeService.add(formData).subscribe({
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

      Object.keys(this.form.controls).forEach(key => {
        if (this.form.controls[key].invalid) {
          let fieldName = '';
          switch (key) {
            case 'Name':
              fieldName = 'عنوان الجائزة';
              break;
            case 'PrizeImage':
              fieldName = 'صورة الجائزة';
              break;
            case 'Description':
              fieldName = 'وصف الجائزة';
              break;
            case 'ApplicationEndDate':
              fieldName = 'تاريخ انتهاء التقدم';
              break;
            case 'ApplicationStartDate':
              fieldName = 'تاريخ بدء التقدم';
              break;
            // Add cases for other fields if needed
          }
          this.service.toastService.error(`الرجاء ادخال ${fieldName}`);
        }
      });
    }
  }
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  onFileSelected2(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isImageFile(file)) {
      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.imageIn = file;
          this.PrizeImage.setValue(file.name)
        } else {
          this.imageIn = null;
          this.PrizeImage.setValue('')
          this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
        }
      })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });
    } else {
      this.imageIn = null;
      this.PrizeImage.setValue('')
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
}
