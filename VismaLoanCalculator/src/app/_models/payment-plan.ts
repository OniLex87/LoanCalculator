export interface IPaymentPlan {
  initialLoanAmount: number
  totalPayableAmount: number
  montlyRateAmount: number
  monthlyInterestAmount: number
  nextDueDate: Date
  remainingLoanAmount: number
}

export class PaymentPlan implements IPaymentPlan {

  initialLoanAmount: number;
  totalPayableAmount: number;
  montlyRateAmount: number;
  monthlyInterestAmount: number;
  nextDueDate: Date;
  remainingLoanAmount: number;

  constructor() {
    this.initialLoanAmount = 10;
    this.totalPayableAmount = 0;
    this.montlyRateAmount = 0;
    this.monthlyInterestAmount = 0;
    this.nextDueDate = new Date();
    this.remainingLoanAmount = 0;
  }

}

