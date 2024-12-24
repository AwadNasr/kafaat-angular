import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MainDashoardService } from '../../services/main-dashoard.service';
import { ResponseVM } from 'src/app/kafaat/core/models/response-vm';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent implements OnInit , AfterViewInit {
  constructor(public dialogRef: MatDialogRef<AdvancedSearchComponent>,private adminService:MainDashoardService,private fb: FormBuilder){
const currentDate = new Date();

// Add one day
currentDate.setDate(currentDate.getDate() + 1);
    this.searchForm = this.fb.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      phoneNumber: [''],
      identityNumber: [''],
      birthDateInAD: [null],
      countryId: [0],
      districtId: [0],
      familyBranchId: [0],
      qualificationId: [0],
      specializationId: [0]
    });
  }
  ngOnInit(): void {
    this.loadCountries();
    this.loadFamilyBranches();
    this.loadQualifications();
    this.loadDistricts();
    this.loadSpecializations();
  }

  ngAfterViewInit(): void {

  }
  //email:string='';
  searchForm: FormGroup;
  countries:any[]=[];
  districts:any[]=[];
  familyBranches:any[]=[];
  qualifications:any[]=[];
  specializations:any[]=[];
  onSearch(): void {
    if (this.searchForm.valid) {
      const searchParams = this.searchForm.value;
      this.dialogRef.close(searchParams);
    }

  }





  loadCountries(){
    this.adminService.countryService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.countries = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadFamilyBranches(){
    this.adminService.familyBranchService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.familyBranches = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadQualifications(){
    this.adminService.qualificationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.qualifications = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadSpecializations(){
    this.adminService.specializationService.getAll().subscribe({
      next:(res:ResponseVM)=>{
        if(res.statusCode==200){
          this.specializations = res.data
        }else{
          this.adminService.toastService.error(res.message);
        }
      }
    });
  }
  loadDistricts(){
    this.adminService.districtService.getAll().subscribe({
    next:(res:ResponseVM)=>{
      if(res.statusCode==200){
        this.districts = res.data
      }else{
        this.adminService.toastService.error(res.message);
      }
    }
  });
}

}
