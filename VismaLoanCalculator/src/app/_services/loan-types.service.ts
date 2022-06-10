export class LoanTypesService {
    getLoanTypes() {
        return [{ key: "standard", value: "Standard Loan" }, { key: "mortgage", value: "Mortgage Loan" }, { key: "carloan", value: "Car Loan" }, { key: "creditcard", value: "Credit Card" }];
    }
}