import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddExcellencePrizeComponent } from '../add-excellence-prize/add-excellence-prize.component';
import { LibraryCategoryService } from '../../services/library-category.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';

@Component({
  selector: 'app-add-library-category',
  templateUrl: './add-library-category.component.html',
  styleUrls: ['./add-library-category.component.css']
})
export class AddLibraryCategoryComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  id: number
  title:string;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,private LibraryCategoryService:LibraryCategoryService,
    private dialogRef: MatDialogRef<AddLibraryCategoryComponent>) {

  }
  ngOnInit(){
    this.createForm();
  }
  createForm() {
    if (this.data) {
      this.title = 'تعديل الفئة '
      this.form = this.service.formBuilder.group({
        Title: [this.data.title, [Validators.required]],

      });
    } else {
      this.title = 'إضافة فئة '
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
  submit() {



    if (this.form.valid) {
      const formData = new FormData();


      formData.append('Title', this.form.value.Title);

      if (this.data) {
        formData.append('id', this.data.id);
        this.LibraryCategoryService.update(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      } else {
        this.LibraryCategoryService.add(formData).subscribe({
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

  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
