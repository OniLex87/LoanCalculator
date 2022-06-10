import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-loantype',
  templateUrl: './loantype.component.html',
  styleUrls: ['./loantype.component.css']
})
export class LoantypeComponent implements OnInit {
  @Input() loanTypesFromHomeComponent: any;
  @Output() getLoanTypes = new EventEmitter();
  model: any = {};
  constructor() { }

  ngOnInit(): void {
  }

  selectLoanType() {
    console.log(this.model);
  }

}

export enum LoanType {
  Standard = 10,
  Mortgage = 20,
  Car = 30,
  CreditCard = 40
}