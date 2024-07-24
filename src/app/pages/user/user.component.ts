import { Component, OnInit } from '@angular/core';
import { DataService } from './userdata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit{
  data: any;
  value: string = '';
  constructor(private dataService: DataService){}
  
  ngOnInit(){
  this.dataService.fetchData().subscribe(data=>{
          this.data = data;
      });
  }
}
