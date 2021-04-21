import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Currency } from '../code/currencies.dto';

@Component({
  selector: 'app-curr-select',
  templateUrl: './curr-select.component.html',
  styleUrls: ['./curr-select.component.scss']
})
export class CurrSelectComponent implements OnInit {

  _curr?: Currency;
  @Input() list?: Currency[];
  @Input() set curr(value: Currency) {
    this._curr = value;
    this.changeFlag();
  }
  get curr(): Currency {
      return this._curr;
  }
  @Output() changed = new EventEmitter<Currency>();
  flagClass = {};

  constructor() { }

  ngOnInit(): void {
    this.changeFlag();
  }

  onCurrChange(): void {
    this.changed.emit(this.curr);
    this.changeFlag();
  }

  changeFlag(): void {
    this.flagClass = {
      'currency-flag': true,
    };
    this.flagClass[`currency-flag-${this.curr?.curr?.toLowerCase()}`] = true;
  }

}
