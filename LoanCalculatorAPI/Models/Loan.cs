
namespace LoanCalculatorAPI.Models
{
    public class Loan
    {
        public int LoanPeriod { get; set; }

        public double LoanAmmount { get; set; }

        public LoanType LoanType { get; set; }

    }
    public enum LoanType
    {
        Standard = 10,
        Mortgage = 20,
        Carloan = 30,
        CreditCard = 40
    }
}
