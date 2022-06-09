import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
   public periodSlider?: PeriodSlider;

  constructor(http: HttpClient) {
  
    http.get<PeriodSlider>('https://localhost:5001/api/loan').subscribe(result => {
      this.periodSlider = result;
    }, error => console.error(error));
  }
  onYearSubmitted(event:any){
    console.log(event);
  }
  // RestrictedValues(event:any){
  //  if(event.target.in)
  // }
  
  title = 'VismaLoanCalculator';

}

interface PeriodSlider{
  periodYears: number;
}



