import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { getAdd, num, str } from '../code/utils';

@Component({
  selector: 'app-num-input',
  templateUrl: './num-input.component.html',
  styleUrls: ['./num-input.component.scss']
})
export class NumInputComponent implements OnInit {

  @Input() value?: string;
  @Output() changed = new EventEmitter<number>();
  classes = { invalid: false, "num-input": true };

  constructor() { }

  ngOnInit(): void {
  }

  onChange(value?: string): void {
    const dValue = num(value || this.value);
    const NaN = isNaN(dValue);
    this.classes.invalid = NaN;
    if (!NaN) { this.changed.emit(dValue); }
  }

  onWheel(event: any, plus: boolean): void {
    const value = num(this.value) + getAdd(event, plus);
    this.changed.emit(value > 0 ? value : 0);
  }

}
