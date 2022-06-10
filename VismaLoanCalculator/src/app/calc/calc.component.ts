import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { CalcService } from '../_services/calc.service';
import { LoanType } from '../loantype/loantype.component';
import { Loan } from '../_models/loan';
import { IPaymentPlan, PaymentPlan } from '../_models/payment-plan';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})



export class CalcComponent implements OnInit {

  public loan: Loan = new Loan();
  public loanType: String = "";
  public _route: ActivatedRoute;

  public rate: string = "";
  public paymentPlan: IPaymentPlan[] = [];
  
  public isVisible = false;

  constructor(private http: HttpClient, route: ActivatedRoute, private calcService: CalcService) {
    this._route = route;
  }


  ngOnInit(): void {

   
    this._route.data.subscribe((result: Data) => {

      this.loanType = LoanType[result['type']];
     
    });

  }

  onSubmit() {
    console.log(JSON.stringify(this.loan))
    // let request = this.http.post("https://localhost:5001/api/loan/calculate",JSON.stringify(this.loan),{
    //   headers:({'Content-Type':'application/json; charset=utf-8'})
    // })
    // request.subscribe((result)=>{
    //     this.rate = (result as any).monthlyRate.toString();

    // })
    //TODO: to implement on submit with the API
    this.postCalculation(JSON.stringify(this.loan));
    this.postPaymentPlan(JSON.stringify(this.loan));
    this.enableDisplay();

  }

  enableDisplay(){
    this.isVisible = true;
  }
  
  postCalculation(data: any) {
    this.calcService.postCalculation(this.loan).subscribe((result) => {
      this.rate = (result as any).monthlyRate.toString();
    })
  }

  postPaymentPlan(data: any) {
    this.calcService.postPaymentPlan(this.loan).subscribe((result) => {
      this.paymentPlan = result as IPaymentPlan[];
      console.warn(result);
    })
  }
}