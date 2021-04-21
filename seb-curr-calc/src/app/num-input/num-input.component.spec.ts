import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumInputComponent } from './num-input.component';

describe('NumInputComponent', () => {
  let component: NumInputComponent;
  let fixture: ComponentFixture<NumInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event if user inputs valid value', () => {
    spyOn(component.changed, 'emit');

    component.onChange('5.6');

    expect(component.changed.emit).toHaveBeenCalledWith(5.6);
  });

  it('should not emit event if user inputs invalid value', () => {
    spyOn(component.changed, 'emit');

    component.onChange('5.6ab');

    expect(component.changed.emit).not.toHaveBeenCalled();
  });

  it('should have invalid class if user inputs invalid value', () => {
    spyOn(component.changed, 'emit');

    component.onChange('5.6ab');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    expect(input.getAttribute('class')).toContain('invalid');
  });

  it('should increase value if mouse wheel turned up', () => {
    spyOn(component.changed, 'emit');
    component.value = '1';
    component.onWheel({}, true);

    expect(component.changed.emit).toHaveBeenCalledWith(2);
  });

  it('should decrese value if mouse wheel turned down', () => {
    spyOn(component.changed, 'emit');
    component.value = '2';
    component.onWheel({}, false);

    expect(component.changed.emit).toHaveBeenCalledWith(1);
  });

  it('should not go below 0 if mouse wheel turned down', () => {
    spyOn(component.changed, 'emit');
    component.value = '0';
    component.onWheel({}, false);

    expect(component.changed.emit).toHaveBeenCalledWith(0);
  });
});
