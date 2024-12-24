import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { AddExcellencePrizeComponent } from '../add-excellence-prize/add-excellence-prize.component';
import { ExcellencePrizeParticipantsService } from '../../services/excellence-prize-participants.service';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-disapprove-participant',
  templateUrl: './disapprove-participant.component.html',
  styleUrls: ['./disapprove-participant.component.css']
})
export class DisapproveParticipantComponent {
  form: FormGroup = new FormGroup({});
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private ExcellencePrizeParticipantsService:ExcellencePrizeParticipantsService,
    private dialogRef: MatDialogRef<DisapproveParticipantComponent>) {
  }
  ngOnInit(){
    this.createForm();
  }
  createForm() {
      this.form = this.service.formBuilder.group({
        ParticipantId: [this.data.participantId, [Validators.required]],
        ExcellencePrizeId:[this.data.excellencePrizeId,[Validators.required]],
        Value: [''],
      });
    }
    get Value() {
      return this.form.controls['Value'];
    }
    submit() {
        const formData = new FormData();

        formData.append('ParticipantId', this.form.value.ParticipantId);
        formData.append('ExcellencePrizeId',  this.form.value.ExcellencePrizeId);
        formData.append('Value', this.form.value.Value);
          this.ExcellencePrizeParticipantsService.disapproveUser(formData).subscribe(res => {
            if (res.statusCode == '200') {
              this.service.toastService.success(res.message);
              this.closeDialog();
            } else {
              this.service.toastService.error(res.message);
            }
          })
    }
    closeDialog(): void {
      this.dialogRef.close();
    }
}
