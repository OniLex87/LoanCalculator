using System;

namespace LoanCalculatorAPI.Models
{
    public class PaymentPlan
    {
        public double InitialLoanAmount { get; set; }

        public double TotalPayableAmount { get; set; }

        public double MontlyRateAmount { get; set; }

        public double MonthlyInterestAmount { get; set; }

        public DateTime NextDueDate { get; set; }

        public double RemainingLoanAmount { get; set; }
    }
}
