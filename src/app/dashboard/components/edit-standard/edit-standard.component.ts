import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { StandardService } from '../../services/standard.service';
import { FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-standard',
  templateUrl: './edit-standard.component.html',
  styleUrls: ['./edit-standard.component.css']
})
export class EditStandardComponent {
  standard:any
  form: FormGroup;
  standardTypes: any[] = [];
  qualificationId: number;
  id: number;
  standardId: number;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private dialogRef: MatDialogRef<EditStandardComponent>,private StandardService:StandardService) {
  this.standard=data;
  }
  ngOnInit(): void {

  this.createForm();
  this.populateForm();
  }
  // createForm() {
  //   this.form = this.service.formBuilder.group({
  //     name: ['', [Validators.required]],
  //     description: [''],
  //     qualificationId: [this.standard.qualificationId || null, [Validators.required]],
  //     excellencePrizeId: [this.standard.excellencePrizeId, [Validators.required]],
  //     standardValueTypes: this.service.formBuilder.array([])
  //   });
  // }
  createForm() {
    this.form = this.service.formBuilder.group({
      id: [{value: null, disabled: true}],
      name: ['', [Validators.required]],
      description: [''],
      qualificationId: [{value: null, disabled: true}],
      excellencePrizeId: [{value: null, disabled: true}],
      standardValueTypes: this.service.formBuilder.array([])
    });
  }
  // populateForm() {
  //   // Patch the basic form fields with the existing data
  //   this.form.patchValue({
  //     name: this.standard.name,
  //     description: this.standard.description,
  //     qualificationId: this.standard.qualificationId || null,
  //     excellencePrizeId: this.standard.excellencePrizeId,
  //   });

  //   // Clear any existing form array items (standardValueTypes)
  //   this.standardValueTypes.clear();

  //   // Populate the standardValueTypes array with the provided data
  //   this.standard.standardValueTypes.forEach((standardValueType: any) => {
  //     const formGroup = this.createStandardValueType();
  //     formGroup.patchValue({
  //       id: standardValueType.id,
  //       standardsId: standardValueType.standardsId,
  //       standardTypesId: standardValueType.standardTypesId,
  //       value: standardValueType.value,
  //     });

  //     // If there are extraValues for this standard, add them
  //     if (standardValueType.extraValues && standardValueType.extraValues.length > 0) {
  //       const extraValuesArray = this.getExtraValues(this.standardValueTypes.length);
  //       standardValueType.extraValues.forEach((extraValue: string) => {
  //         extraValuesArray.push(this.service.formBuilder.control(extraValue));
  //       });
  //     }

  //     this.standardValueTypes.push(formGroup);
  //   });
  // }
  populateForm() {
    this.form.patchValue({
      id:this.standard.id,
      name: this.standard.name,
      description: this.standard.description,
      qualificationId: this.standard.qualificationId || null,
      excellencePrizeId: this.standard.excellencePrizeId
    });

    this.standardValueTypes.clear();

    // Populate the form array with standard values
    this.standard.standardValueTypes.forEach((standardValueType: any) => {
      const formGroup = this.createStandardValueType(standardValueType);
      this.standardValueTypes.push(formGroup);
    });
  }
  createStandardValueType(standardValueType: any): FormGroup {
    return this.service.formBuilder.group({
      id: [{value: standardValueType.id, disabled: true}],
      standardsId: [{value: standardValueType.standardsId, disabled: true}],
      standardTypesId: [{value: standardValueType.standardTypesId, disabled: true}],
      value: [standardValueType.value || '']
    });
  }
  get standardValueTypes(): FormArray {
    return this.form.get('standardValueTypes') as FormArray;
  }
  // createStandardValueType(): FormGroup {
  //   return this.service.formBuilder.group({
  //     id: [this.standard.standardValueTypes[0].id],
  //     standardsId: [this.standard.standardValueTypes[0].standardsId, [Validators.required]],
  //     standardTypesId: [this.standard.standardValueTypes[0].standardTypesId, [Validators.required]],
  //     value: [null],
  //     extraValues: this.service.formBuilder.array([])
  //   });
  // }



    // Helper method to access extraValues FormArray for a given index
    getExtraValues(index: number): FormArray {
      return this.getStandardValueType(index).get('extraValues') as FormArray;
    }

    // Method to get a specific standardValueType FormGroup at a given index
    getStandardValueType(index: number): FormGroup {
      return this.standardValueTypes.at(index) as FormGroup;
    }

    // Add extra values dynamically for the selected standardValueType at a given index
    addExtraValue(index: number): void {
      const extraValuesArray = this.getExtraValues(index);
      extraValuesArray.push(this.service.formBuilder.control(''));
    }
    // submit() {
    //   if (this.form.invalid) {
    //     console.error('Form is invalid');
    //     return;
    //   }

    //   const formData = this.form.value;

    //   // Process formData and prepare for submission
    //   this.StandardService.update(formData).subscribe({
    //     next: (response) => {
    //       this.service.toastService.success('تم تحديث المعيار بنجاح');
    //       this.closeDialog();
    //     },
    //     error: (error) => {
    //       this.service.toastService.error('فشل في التحديث');
    //     }
    //   });
    // }
    submit() {
      if (this.form.invalid) {
        console.error('Form is invalid');
        return;
      }

      // Include the fixed fields in the submission by extracting them even though they are disabled
      const formData = {
        ...this.form.getRawValue(),
        id:this.standard.id,
        qualificationId: this.standard.qualificationId,  // Keep this field unchanged
        excellencePrizeId: this.standard.excellencePrizeId  // Keep this field unchanged
      };

      // Process formData and submit it
      this.StandardService.update(formData).subscribe({
        next: (response) => {
          this.service.toastService.success('تم تحديث المعيار بنجاح');
          this.closeDialog();
        },
        error: (error) => {
          this.service.toastService.error('فشل في التحديث');
        }
      });
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
    get name() {
      return this.form.controls['name'];
    }
    get description() {
      return this.form.controls['description'];
    }
}
