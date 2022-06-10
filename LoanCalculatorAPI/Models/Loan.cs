
namespace LoanCalculatorAPI.Models
{
    public class Loan
    {
        public int Period { get; set; }
        public double Amount { get; set; }
        public int LoanType { get; set; }

    }
    public enum LoanType
    {
        Standard = 10,
        Mortgage = 20,
        Carloan = 30,
        CreditCard = 40
    }
}
