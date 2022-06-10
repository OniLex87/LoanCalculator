using LoanCalculatorAPI.Intefaces;
using LoanCalculatorAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LoanCalculatorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoanController : ControllerBase
    {
        private readonly ILoanService _loanService;
        

        public LoanController(ILoanService loanService)
        {
            _loanService = loanService;
        }

        // GET api/<LoanController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<LoanController>
        [HttpPost("payment-plan")]
        public IActionResult Post(Loan loan)
        {
            if (loan == null)
                return BadRequest();

            var result = _loanService.PaymentPlanGenerator(loan);

            return new JsonResult(result);
        }

        [HttpPost("calculate")]
        public IActionResult Calculate(Loan loan)
        {
            if (loan == null)
                return BadRequest();

            var result = _loanService.CalculateLoanMonthlyRate(loan);

            return new JsonResult(new {monthlyRate = result});
        }

 

    }
}
