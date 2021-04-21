import { TestBed } from '@angular/core/testing';
import { MouseWheelDirective } from './mousewheel/mousewheel.directive';
import { AppComponent } from './app.component';
import { CalcComponent } from './calc/calc.component';
import { NumInputComponent } from './num-input/num-input.component';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CalcComponent,
        MouseWheelDirective,
        NumInputComponent,
      ],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'seb-curr-calc'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('seb-curr-calc');
  });
});
