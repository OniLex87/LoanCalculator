import { provideProtractorTestingSupport } from "@angular/platform-browser";
import { LoanType } from "../loantype/loantype.component";

export interface ILoan {
    period: number;
    amount: number;
    interest: number;
    type: LoanType;
}

export class Loan implements ILoan {
    period: number;
    amount: number;
    interest: number;
    type: LoanType;

    constructor() {

        this.period = 1;
        this.amount = 1000;
        this.interest = 3.5;
        this.type = LoanType.Standard;
    }

}