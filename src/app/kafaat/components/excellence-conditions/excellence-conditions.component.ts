import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcellencePrizeService } from 'src/app/dashboard/services/excellence-prize.service';
import { MainDashoardService } from 'src/app/dashboard/services/main-dashoard.service';
import { AuthService } from '../../services/auth.service';
import { PagedRequest } from '../../core/models/paged-request';

@Component({
  selector: 'app-excellence-conditions',
  templateUrl: './excellence-conditions.component.html',
  styleUrls: ['./excellence-conditions.component.css']
})
export class ExcellenceConditionsComponent {
  id:any
  pagedRequest:PagedRequest = {pageNumber:1,pageSize:5,name:''};
  conditions:any
  formattedDescription: string = '';
  prizes:any
  constructor(public service:MainDashoardService,private router: Router,private excellencePrizeService:ExcellencePrizeService
    ,private authService:AuthService,private route: ActivatedRoute
  ) {
     this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  ngOnInit(): void {
      this.loadExcellencePrize();
      this.getAll();
    }
  loadExcellencePrize(){
      this.pagedRequest.id=this.id;
      this.excellencePrizeService.getPage(this.pagedRequest).subscribe({
        next:(res:any)=>{
            this.conditions=res.items[0].staticContents[2].staticContentValues;

            this.conditions = this.conditions.map((item: any) => {
              if (item.description) {
                item.description = item.description
                  .split('\r\n')
                  .map((line: string, index: number) => `${index + 1}. ${line.trim()}`)
                  .join('<br/>');
              }
              return item;
            });
            console.log(this.conditions);
        }
      });
}
getAll() {
  this.excellencePrizeService.getAlls(this.id).subscribe({
      next: (res: any) => {
          this.prizes = res.data;
      }
  });
}
}
