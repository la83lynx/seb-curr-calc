import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CalcComponent } from './calc.component';

describe('CalcComponent', () => {
  let component: CalcComponent;
  let fixture: ComponentFixture<CalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if we get one', () => {
    component.currencies.error = 'Error';
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('#error>p');
    expect(error).toBeDefined();
    expect(error.innerHTML).toBe('Error');
  });

  it('should not show error if we have none', () => {
    component.currencies.error = undefined;
    fixture.detectChanges();

    const error = fixture.nativeElement.querySelector('#error>p');
    expect(error).toBeNull();
  });

  it('should change buyValue if we change sellValue', () => {
    component.convRate = 1.4;
    component.buyValue = '1';
    component.onSellChange(1);
    fixture.detectChanges();

    expect(component.sellValue).toBe('1');
    expect(component.buyValue).toBe('1.4');
  });

  it('should change sellValue if we change buyValue', () => {
    component.convRate = 0.5;
    component.sellValue = '1';
    component.onBuyChange(1);
    fixture.detectChanges();

    expect(component.buyValue).toBe('1');
    expect(component.sellValue).toBe('2');
  });

  it('should recalc correctly if we change sell currency', () => {
    component.sellValue = '1';
    component.buyCurr = {curr: 'USD', rate: 1.4};
    component.onSellCurrChange({curr: 'JPY', rate: 0.1});
    fixture.detectChanges();

    expect(component.sellValue).toBe('1');
    expect(component.buyValue).toBe('14');
  });

  it('should recalc correctly if we change buy currency', () => {
    component.sellValue = '1';
    component.sellCurr = {curr: 'EUR', rate: 1};
    component.onBuyCurrChange({curr: 'JPY', rate: 0.1});
    fixture.detectChanges();

    expect(component.sellValue).toBe('1');
    expect(component.buyValue).toBe('0.1');
  });

  it('should swap values if we click swap', () => {
    component.sellValue = '1';
    component.sellCurr = {curr: 'EUR', rate: 1};
    component.buyValue = '1.4';
    component.buyCurr = {curr: 'USD', rate: 1.4};
    component.onSwap();
    fixture.detectChanges();

    expect(component.sellValue).toBe('1.4');
    expect(component.buyValue).toBe('1');
    expect(component.sellCurr.curr).toBe('USD');
    expect(component.buyCurr.curr).toBe('EUR');
  });
});
