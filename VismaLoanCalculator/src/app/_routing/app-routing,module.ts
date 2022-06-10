import { Routes, RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { LoanType } from '../loantype/loantype.component';
import { CalcComponent } from '../calc/calc.component';


const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data:{animation:0}
    },
    {
        path: 'calc-standard',
        component: CalcComponent,
        data: { type: LoanType.Standard, animation:1 }
    },
    {
        path: 'calc-mortgage',
        component: CalcComponent,
        data: { type: LoanType.Mortgage,animation:2  }
    },
    {
        path: 'calc-carloan',
        component: CalcComponent,
        data: { type: LoanType.Car,animation:3 }
    },
    {
        path: 'calc-creditcard',
        component: CalcComponent,
        data: { type: LoanType.CreditCard,animation:4 }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
