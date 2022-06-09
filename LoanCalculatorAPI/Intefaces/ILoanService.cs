using LoanCalculatorAPI.Models;
using System.Collections.Generic;

namespace LoanCalculatorAPI.Intefaces
{
    public interface ILoanService
    {
        double CalculateLoanMonthlyRate(Loan loan);

        IEnumerable<PaymentPlan> PaymentPlanGenerator(Loan loan);
    }
}
