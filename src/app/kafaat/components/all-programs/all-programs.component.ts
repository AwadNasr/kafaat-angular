import { Component, OnInit } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';

@Component({
  selector: 'app-all-programs',
  templateUrl: './all-programs.component.html',
  styleUrls: ['./all-programs.component.css']
})
export class AllProgramsComponent implements OnInit {

  items:any[]
  constructor(private service:KafaatMainService) {
   
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.programService.geAll().subscribe(response=>{
      if(response.statusCode=='200'){
        this.items=response.data;
      }
    })
  }


}
