import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrSelectComponent } from './curr-select.component';

describe('CurrSelectComponent', () => {
  let component: CurrSelectComponent;
  let fixture: ComponentFixture<CurrSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event if user selects currency', () => {
    spyOn(component.changed, 'emit');

    component.curr = {curr: 'JPY', rate: 1 };
    component.onCurrChange();

    expect(component.changed.emit).toHaveBeenCalledWith({curr: 'JPY', rate: 1 });
  });

  it('should display Loading... if no currencies available', () => {
    component.list = undefined;

    const firstOption = fixture.nativeElement.querySelector('select>option:first-child');
    expect(firstOption.innerHTML).toBe('Loading...');
  });

  it('should change flag class if currency selected', () => {
    component.curr = {curr: 'JPY', rate: 1 };
    component.onCurrChange();

    fixture.detectChanges();
    const flag = fixture.nativeElement.querySelector('div.currency-flag');
    expect(flag.getAttribute('class')).toContain('currency-flag-jpy');
  });
});
