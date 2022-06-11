import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoantypeComponent } from '../loantype/loantype.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  browseMode = false;
  types: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  gerTypesofLoans(event: number) {
    this.types = event;
  }
}