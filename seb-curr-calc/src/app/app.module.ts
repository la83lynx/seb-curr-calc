import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MouseWheelDirective } from './mousewheel/mousewheel.directive';
import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { NumInputComponent } from './num-input/num-input.component';
import { CurrSelectComponent } from './curr-select/curr-select.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcComponent,
    MouseWheelDirective,
    NumInputComponent,
    CurrSelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
