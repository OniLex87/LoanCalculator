using System;

namespace LoanCalculatorAPI.Models
{
    public class PaymentPlan
    {
        public double InitialLoanAmmount { get; set; }

        public double TotalPayableAmmount { get; set; }

        public double MontlyRateAmmount { get; set; }

        public double MonthlyInterestAmmount { get; set; }

        public DateTime NextDueDate { get; set; }

        public double RemainingLoanAmmount { get; set; }
    }
}
