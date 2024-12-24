import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { ExcellencePrizeService } from '../../services/excellence-prize.service';
import { FormGroup, Validators } from '@angular/forms';
import { ExcellencePrizeParticipantsService } from '../../services/excellence-prize-participants.service';

@Component({
  selector: 'app-add-user-to-prize',
  templateUrl: './add-user-to-prize.component.html',
  styleUrls: ['./add-user-to-prize.component.css']
})
export class AddUserToPrizeComponent {
  id:any
  form: FormGroup = new FormGroup({});
  prizes:any
  filter: FormGroup = new FormGroup({});
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddUserToPrizeComponent>,private ExcellencePrizeService:ExcellencePrizeService,
    private ExcellencePrizeParticipantsService:ExcellencePrizeParticipantsService) {
   this.id=data
   console.log(this.id);

  }
  async ngOnInit(): Promise<void> {
    this.getPrizes();
    this.createForm();

  }
  getPrizes(){
    this.ExcellencePrizeService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.prizes = res.data;
        }else{
          this.service.toastService.error(res.message);
        }
      }
    })
  }
  createForm() {
      this.form = this.service.formBuilder.group({
        ParticipantId: [this.id, [Validators.required]],
        ExcellencePrizeId: [null, [Validators.required]],
      });
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get ExcellencePrizeId() {
    return this.form.controls['ExcellencePrizeId'];
  }
  submit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('ParticipantId', this.form.value.ParticipantId);
      formData.append('ExcellencePrizeId', this.form.value.ExcellencePrizeId);
        this.ExcellencePrizeParticipantsService.addUser(formData).subscribe(res => {
          if (res.statusCode == '200') {
            this.service.toastService.success(res.message);
            this.closeDialog();
          } else {
            this.service.toastService.error(res.message);
          }
        })

    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
