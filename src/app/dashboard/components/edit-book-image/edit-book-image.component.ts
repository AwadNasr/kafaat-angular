import { NgxMatDateAdapter } from '@angular-material-components/datetime-picker';
import { Component, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { EditQrComponent } from '../edit-qr/edit-qr.component';
import { PublisherService } from '../../services/publisher.service';

@Component({
  selector: 'app-edit-book-image',
  templateUrl: './edit-book-image.component.html',
  styleUrls: ['./edit-book-image.component.css']
})
export class EditBookImageComponent {
  form: FormGroup = new FormGroup({});
  filter: FormGroup = new FormGroup({});
  title:string;
  minWidthProgram: number = 60;
  minHeightProgram: number = 60;
  currentImage:any
  constructor(private service: MainDashoardService,private PublisherService:PublisherService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>, private jak: NgxMatDateAdapter<Date>,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<EditBookImageComponent>) {
    this.dateAdapter.setLocale('ar-eg');
    jak.setLocale('ar-eg');
this.currentImage=this.data.imageBook;
//console.log(this.currentImage,this.data.image);

  }
  async ngOnInit(): Promise<void> {

    this.createForm();

  }
  createForm() {
    if (this.data) {
      this.title = 'تعديل الصورة'
      this.form = this.service.formBuilder.group({
        ParticipantId: [this.data.participantId, [Validators.required]],
        FamilyWritingsId: [this.data.familyWritingsId, [Validators.required]],
        Image: [this.data.imageBook, [Validators.required]],
      });
    }
    this.filter = this.service.formBuilder.group({
      filterInput: ['']
    })
  }
  get Image() {
    return this.form.controls['Image'];
  }
  get FamilyWritingsId() {
    return this.form.controls['FamilyWritingsId'];
  }
  get ParticipantId() {
    return this.form.controls['ParticipantId'];
  }
  fileIn: File;
  async submit() {
    if(this.form.valid) {
     const formData = new FormData();
     formData.append('ParticipantId', this.form.value.ParticipantId);
     formData.append('FamilyWritingsId', this.form.value.FamilyWritingsId);
     if (this.fileIn) {
      formData.append('Image', this.fileIn);
    } else {
      formData.append('Image', null);
    }
       if (this.data) {
         this.PublisherService.editImage(formData).subscribe(res => {
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
  isClubImage(file: File): boolean {
    return file.type.startsWith('image/');
  }
  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (this.isClubImage(file)) {
      this.checkImageDimensions(file).then((dimensions) => {
        const [width, height] = dimensions;
        if (width >= this.minWidthProgram && height >= this.minHeightProgram) {
          this.fileIn = file;
          this.Image.setValue(file.name)
         // Display the selected image
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.currentImage = e.target.result; // Set the image source for preview
        };
        reader.readAsDataURL(file); // Convert file to DataURL
        } else {
          this.fileIn = null;
          this.Image.setValue('')
          this.service.toastService.error(`Image dimensions must be at least ${this.minWidthProgram} * ${this.minHeightProgram} pixels.`);
        }
      })
        .catch((error) => {
          console.error('Error checking image dimensions:', error);
        });


    } else {
      this.fileIn = null;
      this.Image.setValue('')
      alert('Please select a valid image file.');
    }
  }
  async checkImageDimensions(file: File): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        resolve([image.width, image.height]);
      };
      image.onerror = (error) => {
        reject(error);
      };
      image.src = URL.createObjectURL(file);
    });
  }
}
