import { Component, OnInit } from '@angular/core';
import { KafaatMainService } from '../../services/kafaat-main.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-manashet-details-distinguished-page',
  templateUrl: './manashet-details-distinguished-page.component.html',
  styleUrls: ['./manashet-details-distinguished-page.component.css']
})
export class ManashetDetailsDistinguishedPageComponent implements OnInit {

  id:number
  items:any[]=[]
  constructor(private service:KafaatMainService,private route:ActivatedRoute) {
  this.route.params.subscribe(res=>{
    this.id=res['id']
  })

    
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.service.activityParticipantsService.getDistinguishs(this.id).subscribe(response=>{
      if(response.statusCode=='200'){
        this.items=response.data
      }
    })
  }
}
