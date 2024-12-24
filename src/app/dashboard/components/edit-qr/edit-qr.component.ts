import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddVolunteerComponent } from '../add-volunteer/add-volunteer.component';
import { PublisherService } from '../../services/publisher.service';

@Component({
  selector: 'app-edit-qr',
  templateUrl: './edit-qr.component.html',
  styleUrls: ['./edit-qr.component.css']
})
export class EditQrComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  title:string;
  constructor(private service: MainDashoardService,private PublisherService:PublisherService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditQrComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
  }
  async ngOnInit(): Promise<void> {

    this.createForm();

  }
  createForm() {
    if (this.data) {
      this.title = 'تعديل رمز QR'
      this.form = this.service.formBuilder.group({
        ParticipantId: [this.data.participantId, [Validators.required]],
        FamilyWritingsId: [this.data.familyWritingsId, [Validators.required]],
        QRCode: [this.data.qrCode, [Validators.required]],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get QRCode() {
    return this.form.controls['QRCode'];
  }
  get FamilyWritingsId() {
    return this.form.controls['FamilyWritingsId'];
  }
  get ParticipantId() {
    return this.form.controls['ParticipantId'];
  }
  async submit() {
   if(this.form.valid) {
    const formData = new FormData();
    formData.append('ParticipantId', this.form.value.ParticipantId);
    formData.append('FamilyWritingsId', this.form.value.FamilyWritingsId);
    formData.append('QRCode', this.form.value.QRCode);
      if (this.data) {
        this.PublisherService.editQr(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })
      }
    }
    else {
      console.log(this.form);
      this.service.toastService.error("افحص كل المطلوب");
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
