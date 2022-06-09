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
            var months = YearsToMonthsConverter(loan.LoanPeriod);
            var totalLoanInterest = TotalInterest(loan);
            var monthlyLoanRate = MonthlyRateCalculator(loan);

            for (int i = 0; i < months; i++)
            {
                yield return new PaymentPlan
                {
                    InitialLoanAmmount = loan.LoanAmmount,
                    NextDueDate = DateTime.UtcNow.AddMonths(i),
                    TotalPayableAmmount = TotalPayableLoanAmmount(loan.LoanAmmount, totalLoanInterest),
                    MonthlyInterestAmmount = CalculateLoanMontlyInterest(loan),
                    MontlyRateAmmount = monthlyLoanRate,
                    RemainingLoanAmmount = CalculateRemainingDebtAmmount(loan.LoanAmmount, monthlyLoanRate, i)
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

            return MontlyInterestAmmountCalculator(loan);
        }

        #region Helping methods
        /// <summary>
        /// Main calculus method used to obtain the monthly payment rate
        /// </summary>
        /// <param name="loan"></param>
        /// <returns>value of the monthly loan rate</returns>
        private double MonthlyRateCalculator(Loan loan)
        {
            var loantotalmonths = YearsToMonthsConverter(loan.LoanPeriod);
            var totalLoanInterest = TotalInterest(loan);
            var totalPayableAmmount = TotalPayableLoanAmmount(loan.LoanAmmount, totalLoanInterest);

            return Math.Round(totalPayableAmmount / loantotalmonths, 2);
        }

        private double MontlyInterestAmmountCalculator(Loan loan)
        {
            var totalLoanInterest = TotalInterest(loan);
            var loanTotalMonths = YearsToMonthsConverter(loan.LoanPeriod);

            return Math.Round(totalLoanInterest / loanTotalMonths, 2);
        }

        private double TotalInterest(Loan loan)
        {
            return Math.Round((loan.LoanAmmount * (_constants.FixedLoanInterest / 100) * loan.LoanPeriod), 2);
        }

        private double TotalPayableLoanAmmount(double loanammount, double totalinterest)
        {
            return Math.Round((loanammount + totalinterest), 2);
        }

        private double MontlyRateWithoutInterest(double montlyinterestammount, double monthlyrateammount)
        {
            return Math.Round(monthlyrateammount - montlyinterestammount, 2);
        }

        private double CalculateRemainingDebtAmmount(double initialammount, double monthlyrateammount, int factor)
        {
            return  (Math.Round(initialammount - (monthlyrateammount * factor), 2));
        }

        private int YearsToMonthsConverter(int years)
        {
            return years * 12;
        }

        #endregion Helping methods

    }
}
