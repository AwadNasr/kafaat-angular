import { Component } from '@angular/core';
import { FamilyWritingsService } from '../../services/family-writings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-family-writing-details',
  templateUrl: './family-writing-details.component.html',
  styleUrls: ['./family-writing-details.component.css']
})
export class FamilyWritingDetailsComponent {
  id:any;
  familyWriting:any;
  constructor(public service:MainDashoardService,private router: Router,private FamilyWritingsService:FamilyWritingsService
    ,private route: ActivatedRoute
      ) {
         this.route.params.subscribe(params => {
          this.id = params['id'];

        });
      }
      ngOnInit(): void {
        this.loadFamilyWriting();
    }
    loadFamilyWriting(): void {
      this.FamilyWritingsService.getById(this.id).subscribe({
          next: (res: any) => {
              this.familyWriting = res.data;
          },
      });
  }
}
