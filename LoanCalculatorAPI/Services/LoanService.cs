using LoanCalculatorAPI.Intefaces;
using LoanCalculatorAPI.Models;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;

namespace LoanCalculatorAPI.Services
{
    public class LoanService : ILoanService
    {
        private readonly Constants _constants;

        public LoanService(IOptions<Constants> constants)
        {
            _constants = constants?.Value;
        }
        /// <summary>
        /// Method used to access the rate calculator.
        /// </summary>
        /// <param name="loan"></param>
        /// <returns>value of montly rate</returns>
        /// <exception cref="InvalidOperationException"></exception>
        public double CalculateLoanMonthlyRate(Loan loan)
        {
            if (loan == null)
            {
                throw new InvalidOperationException();
            }

            return MonthlyRateCalculator(loan);
        }

        /// <summary>
        /// Method used to generate the payment plan
        /// </summary>
        /// <param name="loan"></param>
        /// <returns>A new payment plan for the selected period</returns>
        public IEnumerable<PaymentPlan> PaymentPlanGenerator(Loan loan)
        {
            return CreatePaymentPlan(loan);
        }

        private IEnumerable<PaymentPlan> CreatePaymentPlan(Loan loan)
        {
            var months = YearsToMonthsConverter(loan.Period);
            var totalLoanInterest = TotalInterest(loan);
            var monthlyLoanRate = MonthlyRateCalculator(loan);
            var totalPayableAmount = TotalPayableLoanAmount(loan.Amount, totalLoanInterest);
            for (int i = 0; i < months; i++)
            {
                
                yield return new PaymentPlan
                {
                    InitialLoanAmount = loan.Amount,
                    NextDueDate = DateTime.UtcNow.AddMonths(i),
                    TotalPayableAmount = totalPayableAmount,
                    MonthlyInterestAmount = CalculateLoanMontlyInterest(loan),
                    MontlyRateAmount = monthlyLoanRate,
                    RemainingLoanAmount = CalculateRemainingDebtAmount(totalPayableAmount, monthlyLoanRate, i)
                };
            }
        }

        /// <summary>
        /// Method used in the payment plan
        /// Method kept public in case of different types of loans
        /// </summary>
        /// <param name="loan"></param>
        /// <returns>value of monthly interest</returns>
        /// <exception cref="InvalidOperationException"></exception>
        public double CalculateLoanMontlyInterest(Loan loan)
        {
            if (loan == null)
            {
                throw new InvalidOperationException();
            }

            return MontlyInterestAmountCalculator(loan);
        }

        #region Helping methods
        /// <summary>
        /// Main calculus method used to obtain the monthly payment rate
        /// </summary>
        /// <param name="loan"></param>
        /// <returns>value of the monthly loan rate</returns>
        private double MonthlyRateCalculator(Loan loan)
        {
            var loanTotalMonths = YearsToMonthsConverter(loan.Period);
            var totalLoanInterest = TotalInterest(loan);
            var totalPayableAmount = TotalPayableLoanAmount(loan.Amount, totalLoanInterest);

            return Math.Round(totalPayableAmount / loanTotalMonths, 2);
        }

        private double MontlyInterestAmountCalculator(Loan loan)
        {
            var totalLoanInterest = TotalInterest(loan);
            var loanTotalMonths = YearsToMonthsConverter(loan.Period);

            return Math.Round(totalLoanInterest / loanTotalMonths, 2);
        }

        private double TotalInterest(Loan loan)
        {
            return Math.Round((loan.Amount * (_constants.FixedLoanInterest / 100) * loan.Period), 2);
        }

        private double TotalPayableLoanAmount(double loanAmount, double totalInterest)
        {
            return Math.Round((loanAmount + totalInterest), 2);
        }

        private double MontlyRateWithoutInterest(double montlyInterestAmount, double monthlyRateAmount)
        {
            return Math.Round(monthlyRateAmount - montlyInterestAmount, 2);
        }

        private double CalculateRemainingDebtAmount(double initialAmount, double monthlyRateAmount, int factor)
        {
            return  (Math.Round(initialAmount - (monthlyRateAmount * factor), 2));
        }

        private int YearsToMonthsConverter(int years)
        {
            return years * 12;
        }

        #endregion Helping methods
    }
}
