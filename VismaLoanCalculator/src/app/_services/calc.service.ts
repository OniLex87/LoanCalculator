import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Loan } from "../_models/loan";


@Injectable({
    providedIn: 'root'
})

export class CalcService {

    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    postCalculation(data: any) {
        return this.http.post(this.baseUrl + 'calculate', data);
    }

    postPaymentPlan(data: any) {
        return this.http.post(this.baseUrl + 'payment-plan', data);
    }
}
