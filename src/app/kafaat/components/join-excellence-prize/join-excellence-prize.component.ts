import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { StandardService } from 'src/app/dashboard/services/standard.service';
import { ResponseVM } from '../../core/models/response-vm';
import { AbstractControl, FormArray, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ExcellencePrizeParticipantsService } from 'src/app/dashboard/services/excellence-prize-participants.service';

@Component({
  selector: 'app-join-excellence-prize',
  templateUrl: './join-excellence-prize.component.html',
  styleUrls: ['./join-excellence-prize.component.css']
})

export class JoinExcellencePrizeComponent {
  QualificationId:any;
  excellencePrizeId:number
  allQualifications:any
  joinPrizeForm: FormGroup;
  standards:any
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private StandardService:StandardService,
    private dialogRef: MatDialogRef<JoinExcellencePrizeComponent>,private authService:AuthService,private ExcellencePrizeParticipantsService:ExcellencePrizeParticipantsService) {
   this.excellencePrizeId=data;
  }
  minValueValidator(minValue: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value === null || control.value === '') {
        return null;
      }
      const inputValue = parseFloat(control.value);
      return !isNaN(inputValue) && inputValue < minValue
        ? { minValue: { requiredMinValue: minValue } }
        : null;
    };
  }
  ngOnInit(): void {
   this.loadQualifications();
   this.initForm();
  }
  loadQualifications(){
    this.service.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          //this.allQualifications = res.data;
          this.allQualifications = res.data.filter((qualification: any) => qualification.name !== "إبتدائي");
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  loadStandards(){
    this.StandardService.getStandardOfPrize({
      "excellencePrizeId": this.excellencePrizeId,
      "qualificationId": this.QualificationId
    }).subscribe({
      next:(res:any)=>{
        if(res.statusCode==200){
          this.standards=res.data
          this.standards.forEach((standard:any) => {
            this.addStandard(standard);
          });
        }else{
          this.service.toastService.error(res.message);
        }
      }
    });
  }
  onStandardTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedQualificationId = selectElement.value;
    this.QualificationId=selectedQualificationId;
    this.loadStandards();
    this.initForm();

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  private initForm() {
    this.joinPrizeForm = this.service.formBuilder.group({
      participantId: [this.authService.currentUser().id, Validators.required],
      excellencePrizeId: [this.excellencePrizeId, Validators.required],
      qualificationId: [this.QualificationId, Validators.required],
      standardValues: this.service.formBuilder.array([])
    });
  }
  get standardValues(): FormArray {
    return this.joinPrizeForm.get('standardValues') as FormArray;
  }
  // private addStandard(standard: any) {
  //   const controlGroup = this.service.formBuilder.group({
  //     standardId: [standard.id, Validators.required],
  //     value: ['', Validators.required],
  //     type: [standard.values[0].standardTypeName]
  //   });
  //   this.standardValues.push(controlGroup);
  // }
  private addStandard(standard: any) {
    console.log(standard);

    const controlType = standard.values[0].value;
    console.log(controlType);


    let minValue: number | null = null;
    if (standard.values[0].standardTypeName === 'text') {
        minValue = parseFloat(standard.values[0].value);
        console.log(minValue);
    }

    const control = this.service.formBuilder.group({
        value: ['', [Validators.required]],
        type: [standard.values[0].standardTypeName],
        standardId: [standard.id, Validators.required]
    });
    if (standard.values[0].standardTypeName === 'text' && !isNaN(minValue)) {
        control.get('value')?.setValidators([
            Validators.required,
            this.minValueValidator(minValue)
        ]);
    }
    (this.joinPrizeForm.get('standardValues') as FormArray).push(control);
}
  onFileChange(event: any, index: number) {
    const file = event.target.files[0];
    // if (file) {
    //   this.standardValues.at(index).get('value')?.setValue(file);
    // }
    if (file) {
      const control = this.standardValues.at(index) as FormGroup;
      control.patchValue({ value: file });
    }
  }
  onSubmit() {
    if (this.joinPrizeForm.valid) {
const formData = new FormData();
formData.append('participantId', this.joinPrizeForm.get('participantId')?.value);
formData.append('excellencePrizeId', this.joinPrizeForm.get('excellencePrizeId')?.value);
formData.append('qualificationId', this.joinPrizeForm.get('qualificationId')?.value);

const fileArray: File[] = [];

this.standardValues.controls.forEach((control) => {
  const type = control.get('type')?.value;
  const standardId = control.get('standardId')?.value;

  if (type === 'file' || type === 'image') {
    const file = control.get('value')?.value;
    if (file) {
      // Push file to the array
      fileArray.push(file);

      // Append standard values with file name
      formData.append('standardValues', JSON.stringify({
        standardId,
        value: file.name // Use the file name
      }));
    }
  } else {
    const value = control.get('value')?.value;
    if (value) {
      // Append standard values normally for text values
      formData.append('standardValues', JSON.stringify({
        standardId,
        value
      }));
    }
  }
});

// Now, append each file from the array to FormData
fileArray.forEach((file, index) => {
  formData.append(`File`, file); // Append file as a list item
});


      this.ExcellencePrizeParticipantsService.joinPrize(formData).subscribe({
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
  get qualificationId() {
    return this.joinPrizeForm.controls['qualificationId'];
  }

}
