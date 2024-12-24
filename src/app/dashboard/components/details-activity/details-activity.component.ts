import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainDashoardService } from '../../services/main-dashoard.service';

@Component({
  selector: 'app-details-activity',
  templateUrl: './details-activity.component.html',
  styleUrls: ['./details-activity.component.css']
})
export class DetailsActivityComponent implements OnInit{
  id:number
  categories:any[]=[]
  constructor(private route: ActivatedRoute,private service:MainDashoardService) {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
    });
  }
  ngOnInit(): void {
   this.loadData();

  }

  activity:any

  loadData(){
    this.service.activityService.getDetails({id:this.id,idParti:'45'}).subscribe(response=>{
      if(response.statusCode=='200')
      this.activity=response.data;
    console.log(this.activity)
   // this.categories=this.activity.userCategories
    })
  }
}
