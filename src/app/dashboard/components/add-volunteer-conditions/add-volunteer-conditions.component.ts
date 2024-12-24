import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddVolunteerFieldComponent } from '../add-volunteer-field/add-volunteer-field.component';
import { VolunteerConditionsService } from '../../services/volunteer-conditions.service';

@Component({
  selector: 'app-add-volunteer-conditions',
  templateUrl: './add-volunteer-conditions.component.html',
  styleUrls: ['./add-volunteer-conditions.component.css']
})
export class AddVolunteerConditionsComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  id: number
  title:string;
  constructor(private service: MainDashoardService,private VolunteerConditionsService:VolunteerConditionsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddVolunteerConditionsComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  async ngOnInit(): Promise<void> {
    this.createForm();
  }
  createForm() {
    if (typeof this.data === 'object') {
      this.title = 'تعديل شرط التطوع'
      this.form = this.service.formBuilder.group({
        Description: [this.data.description, [Validators.required]],
        VolunteerId: [this.data.volunteerId, [Validators.required]],
      });
    } else {
      this.title = 'إضافة شرط التطوع'
      this.form = this.service.formBuilder.group({
        Description: ['', [Validators.required]],
        VolunteerId: [this.data, [Validators.required]],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Description() {
    return this.form.controls['Description'];
  }
  get VolunteerId() {
    return this.form.controls['VolunteerId'];
  }
  async submit() {
   if(this.form.valid) {
    const formData = new FormData();
    formData.append('Description', this.form.value.Description);
    formData.append('VolunteerId', this.form.value.VolunteerId);
      if (typeof this.data === 'object') {
        formData.append('id', this.data.id);
        this.VolunteerConditionsService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.VolunteerConditionsService.add(formData).subscribe({
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
}
