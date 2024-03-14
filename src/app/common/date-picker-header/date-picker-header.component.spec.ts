import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerHeaderComponent } from './date-picker-header.component';

describe('DatePickerHeaderComponent', () => {
  let component: DatePickerHeaderComponent;
  let fixture: ComponentFixture<DatePickerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatePickerHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatePickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
