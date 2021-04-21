import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { str, num, getAdd } from '../code/utils';
import { Currencies, Currency } from '../code/currencies.dto';
import { timer } from 'rxjs';
@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})

@Injectable()
export class CalcComponent implements OnInit {
  sellValue = '1';
  buyValue = '1.4';
  convRate = 1.4;
  sellCurr = { curr: 'EUR', rate: 1 };
  buyCurr = { curr: 'USD', rate: 1.4 };

  currencies: Currencies = {};
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    timer(0, 60000).subscribe(_ => {
        if (!this.currencies?.list
          || (this.currencies?.expires && this.currencies.expires > new Date())
        ) { this.retrieveCurrencies(); }
      });
  }

  retrieveCurrencies(): void {
    this.http.get<Currencies>('/api/Calc/Latest')
    .subscribe(currs => {
        this.currencies = currs;
        this.buyCurr = this.currencies?.list?.find(x => x.curr === this.buyCurr.curr);
        this.sellCurr = this.currencies?.list?.find(x => x.curr === this.sellCurr.curr);
        this.recalc();
      },
      error => this.currencies = {
        list: [{ curr: 'EUR', rate: 1 }, { curr: 'USD', rate: 1.4 }],
        error: error.message || JSON.stringify(error),
      }
    );
  }

  onSellChange(value: number): void {
      this.sellValue = str(value);
      this.buyValue = str(value * this.convRate);
  }

  onBuyChange(buy: number): void {
      this.buyValue = str(buy);
      this.sellValue = str(buy / this.convRate);
  }

  onSellCurrChange(curr: Currency): void {
    this.sellCurr = curr;
    this.recalc();
  }

  onBuyCurrChange(curr: Currency): void {
    this.buyCurr = curr;
    this.recalc();
  }

  recalc(): void {
    this.convRate = this.buyCurr.rate / this.sellCurr.rate;
    this.onSellChange(num(this.sellValue));
  }

  onSwap(): void {
    const temp = this.sellValue;
    this.sellValue = this.buyValue;
    this.buyValue = temp;
    const temp2 = this.sellCurr;
    this.sellCurr = this.buyCurr;
    this.buyCurr = temp2;
    this.recalc();
  }
}
