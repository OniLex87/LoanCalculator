import { Component } from '@angular/core';
import { LoanTypesService } from './loan-types.service';
@Component({
    selector: 'loantypes',
    template: `
    <nav class="navbar navbar-dark bg-primary">
       <div class="container-fluid">
       <a class="navbar-brand"><h1>{{title}}</h1></a>
           <button class="button" *ngFor="let loantype of loantypes">
                        {{loantype}}
            </button>
    
        </div>
    </nav>
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