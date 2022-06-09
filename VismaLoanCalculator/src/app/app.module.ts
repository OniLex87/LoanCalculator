import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoanTypesComponent } from './loan-types.component';
import { LoanTypesService } from './loan-types.service';
import { StrictNumberOnlyDirective } from 'src/utils/numbers-only.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoanTypesComponent,
    StrictNumberOnlyDirective
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule
  ],
  providers: [LoanTypesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
