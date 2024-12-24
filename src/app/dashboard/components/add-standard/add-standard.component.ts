import { Location } from '@angular/common';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddExcellencePrizeComponent } from '../add-excellence-prize/add-excellence-prize.component';
import { StandardService } from '../../services/standard.service';
import { AtandardTypesService } from '../../services/atandard-types.service';
import { QualificationService } from '../../services/qualification.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-standard',
  templateUrl: './add-standard.component.html',
  styleUrls: ['./add-standard.component.css']
})
export class AddStandardComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  id:any
  qualifications:any[]
  standardTypes:any[]
  standardTypeId:number=2;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private StandardService:StandardService,
    private  StandardTypesService:AtandardTypesService,private QualificationService:QualificationService,
    private dialogRef: MatDialogRef<AddStandardComponent>) {
    this.id=data;
  }
  ngOnInit(): void {
    this.loadQualification();
    this.loadStandardtypes();
    this.createForm();
  }
  loadQualification(){
this.QualificationService.getAll().subscribe({
  next:(res:ResponseVM)=>{
    this.qualifications=res.data;
  }
})
  }
  loadStandardtypes(){
    this.StandardTypesService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        this.standardTypes=res.data;
      }
    })
      }
      closeDialog(): void {
        this.dialogRef.close();
      }
      createForm() {
          this.form = this.service.formBuilder.group({
            name: ['', [Validators.required]],
            description:[''],
            qualificationId: [this.qualificationId, [Validators.required]],
            excellencePrizeId:[this.id, [Validators.required]],
            standardValueTypes: this.service.formBuilder.array([

              this.createStandardValueType()
            ])
          });
        this.filter = this.service.formBuilder.group({
          filterInput: ['']
        })
      }
      createStandardValueType(): FormGroup {
        return this.service.formBuilder.group({
          id: [0],
          standardsId: [0, [Validators.required]],
          standardTypesId: [0, [Validators.required]],
          value: [null],
          extraValues: this.service.formBuilder.array([])
        });
      }


      get name() {
        return this.form.controls['name'];
      }
      get description() {
        return this.form.controls['description'];
      }
      get excellencePrizeId() {
        return this.form.controls['excellencePrizeId'];
      }
      get qualificationId() {
        return this.form.controls['qualificationId'];
      }
      get standardsId() {
        return (index: number) => this.getStandardValueType(index).controls['standardsId'];
      }
      get standardTypesId() {
        return (index: number) => this.getStandardValueType(index).controls['standardTypesId'];
      }
      get value() {
        return (index: number) => this.getStandardValueType(index).controls['value'];
      }
      get standardValueTypes(): FormArray {
        return this.form.get('standardValueTypes') as FormArray;
      }
      getExtraValues(index: number): FormArray {
        return this.getStandardValueTypes().at(index).get('extraValues') as FormArray;
      }
      getStandardValueTypes(): FormArray {
        return this.form.get('standardValueTypes') as FormArray;
      }
      control2: FormControl;
      addExtraValue(index: number): void {
        const extraValuesArray = this.getExtraValues(index);

        this.control2 = this.service.formBuilder.control({'val': [Validators.required]});
        extraValuesArray.push(this.control2);
      }
      getStandardValueType(index: number): FormGroup {
        return this.standardValueTypes.at(index) as FormGroup;
      }
      getStandardTypeId(index: number) {
        return this.getStandardValueType(index).get('standardTypesId');
      }
      onStandardTypeChange(selectedId: number, index: number) {
        const formGroup = this.getStandardValueType(index);
        formGroup.get('standardTypesId')?.setValue(selectedId);


        if (selectedId !== 2) {
          formGroup.get('value')?.reset();
        }
      }
      dynamicForm = this.service.formBuilder.group({});

      addField(index: number): void {
        const extraValuesArray = this.getExtraValues(index);
        const controlName = `field_${Date.now()}`;
        const newField = this.service.formBuilder.control({ 'val': '' }, Validators.required);

        extraValuesArray.push(newField);
      }
      addValueInput(index: number): void {
        const extraValuesArray = this.getExtraValues(index);
        extraValuesArray.push(this.service.formBuilder.control(''));
      }


      submit2(){
        console.log(this.dynamicForm.value);
      }
      submit() {
          //  const formData = this.form.value;
          // const payload = this.createPayload(this.form.value);
          // console.log(payload);
          // console.log(formData);
          // console.log(this.dynamicForm.value);
          console.log(this.form);

          const formData = this.form.value;
          const processedStandardValueTypes:any[] = [];

          formData.standardValueTypes.forEach((item: any) => {
            if (item.extraValues && item.extraValues.length > 0) {

              item.extraValues.forEach((value: string) => {
                processedStandardValueTypes.push({
                  id: item.id,
                  standardsId: item.standardsId,
                  standardTypesId: item.standardTypesId,
                  value: value
                });
              });
            } else {
              // If there are no extraValues, push the item as it is
              processedStandardValueTypes.push({
                id: item.id,
                standardsId: item.standardsId,
                standardTypesId: item.standardTypesId,
                value: item.value
              });
            }
          });


          formData.standardValueTypes = processedStandardValueTypes;


          if(this.form.valid)
          this.StandardService.add(formData).subscribe({
            next: (response: ResponseVM) => {
              if (response.message ==  "تم انشاء المعيار بنجاح") {
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
