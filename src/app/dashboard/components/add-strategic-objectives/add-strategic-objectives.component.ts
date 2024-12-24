import { Component, Inject } from '@angular/core';
import { StrategicObjectivesService } from '../../services/strategic-objectives.service';
import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-strategic-objectives',
  templateUrl: './add-strategic-objectives.component.html',
  styleUrls: ['./add-strategic-objectives.component.css']
})
export class AddStrategicObjectivesComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  title:string;
  constructor(private service: MainDashoardService,private StrategicObjectivesService:StrategicObjectivesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddStrategicObjectivesComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
  }
  async ngOnInit(): Promise<void> {

    this.createForm();

  }
  createForm() {
    if (this.data) {
      this.title = 'تعديل الهدف'
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],
      });
    } else {
      this.title = 'إضافة  الهدف'
      this.form = this.service.formBuilder.group({
        Title: ['', [Validators.required]],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Title() {
    return this.form.controls['Title'];
  }
  async submit() {
   if(this.form.valid) {
    const formData = new FormData();
    formData.append('Title', this.form.value.Title);
      if (this.data) {
        formData.append('id', this.data.id);
        this.StrategicObjectivesService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.StrategicObjectivesService.add(formData).subscribe({
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
