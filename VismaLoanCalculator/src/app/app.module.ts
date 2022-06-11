import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoanTypesComponent } from './nav/nav-loan-types.component';
import { LoanTypesService } from './_services/loan-types.service';
import { StrictNumberOnlyDirective } from 'src/app/_utils/numbers-only.directive';
import { StrictDecimalOnlyDirective } from 'src/app/_utils/double-only.directive';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoantypeComponent } from './loantype/loantype.component';
import { CalcComponent } from './calc/calc.component';
import { AppRoutingModule } from './_routing/app-routing,module';
import { CalcService } from './_services/calc.service';

@NgModule({
  declarations: [
    AppComponent,
    LoanTypesComponent,
    StrictNumberOnlyDirective,
    StrictDecimalOnlyDirective,
    NavComponent,
    HomeComponent,
    LoantypeComponent,
    CalcComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, BrowserAnimationsModule
  ],
  providers: [LoanTypesService, CalcService],
  bootstrap: [AppComponent]
})
export class AppModule { }