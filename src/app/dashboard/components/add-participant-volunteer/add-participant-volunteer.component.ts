import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { VolunteerFieldParticipantsService } from '../../services/volunteer-field-participants.service';

@Component({
  selector: 'app-add-participant-volunteer',
  templateUrl: './add-participant-volunteer.component.html',
  styleUrls: ['./add-participant-volunteer.component.css']
})
export class AddParticipantVolunteerComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  supervisorValue:string = "";
  supervisorsCopy:any[]=[];
  supervisors:any[]
  supervisorsFilter:any[]
  filterSupervisor:FormGroup = new FormGroup({});
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  constructor(private service: MainDashoardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<AddParticipantVolunteerComponent>,private VolunteerFieldParticipantsService:VolunteerFieldParticipantsService) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
  }
  async ngOnInit(): Promise<void> {

    this.createForm();
    this.loadSupervisors();
    this.filterSupervisor.valueChanges.subscribe(newValue => {
      this.supervisors = this.supervisorsFilter.filter(value => value.displayName.includes(newValue.filterInput2));
    });
  }
  filterSupervisors(){
    this.supervisors = this.supervisorsCopy;

  }
  loadSupervisors(){
    this.service.accountService.getAll().subscribe(response=>{
      if(response.statusCode=="200"){
        this.supervisorsFilter=response.data;
        this.supervisors=response.data;
        this.supervisorsCopy = this.supervisors;
      }
    }
    );
  }
  createForm() {
      this.form = this.service.formBuilder.group({
        VolunteerFieldId: [this.data],
        VolunteerHours: [0],
        ActualHours: [0],
        ParticipantId: [null,[Validators.required]],
        Reward: [null],
        IsSupervisor: [false, [Validators.required]],
        IsApprove: [false],
      });

    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
    this.filterSupervisor=this.service.formBuilder.group({
      filterInput2:['']
    })
  }
  get ParticipantId() {
    return this.form.controls['ParticipantId'];
  }
  get IsSupervisor() {
    return this.form.controls['IsSupervisor'];
  }
  get filterInput() {
    return this.filter.controls['filterInput'];
  }
  get filterInput2(){
    return  this.filterSupervisor.controls['filterInput2'];
  }
  submit() {
    if (this.form.valid) {
      const formData = new FormData();
      formData.append('VolunteerFieldId', this.form.value.VolunteerFieldId);
      formData.append('VolunteerHours', this.form.value.VolunteerHours);
      formData.append('ActualHours', this.form.value.ActualHours);
      formData.append('ParticipantId', this.form.value.ParticipantId);
      formData.append('Reward', this.form.value.Reward);
      formData.append('IsSupervisor', this.form.value.IsSupervisor);
      formData.append('IsApprove', this.form.value.IsApprove);
        this.VolunteerFieldParticipantsService.join(formData).subscribe({
          next: (response: any) => {
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

    else {
      Object.keys(this.form.controls).forEach(key => {
        if (this.form.controls[key].invalid) {
          let fieldName = '';
          switch (key) {
            case 'ParticipantId':
              fieldName = 'اسم المتطوع';
              break;
            case 'IsSupervisor':
              fieldName = ' المنصب';
              break;
          }
          this.service.toastService.error(`الرجاء ادخال ${fieldName}`);
        }
      });
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
