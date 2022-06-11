import { Component } from '@angular/core';
import { LoanTypesService } from '../_services/loan-types.service';
@Component({
    selector: 'loantypes',
    template: `
    
    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ">
          
    <li class="nav-item" *ngFor="let loantype of loantypes">
          <a class=" nav-link" aria-current="page" routerLink="calc-{{loantype.key}}">{{loantype.value}}</a>
        </li>
</ul>
    `,
    styles: [`h1 { font-family: Lato; }`]
})
export class LoanTypesComponent {
    title = "Loan Types";
    loantypes;
    constructor(service: LoanTypesService) {
        this.loantypes = service.getLoanTypes();
    }
}