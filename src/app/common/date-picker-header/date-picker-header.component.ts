
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-date-picker-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatIconModule,FontAwesomeModule,MatGridListModule,MatCardModule],
  templateUrl: './date-picker-header.component.html',
  styleUrl: './date-picker-header.component.scss'
})
export class DatePickerHeaderComponent<D> implements OnDestroy {

  private _destroyed = new Subject<void>();

  rightArrow = faCaretRight;
  leftArrow = faCaretLeft;

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    const monthName = this._dateAdapter
      .format(this._calendar.activeDate, 'MMMM');
    const year = this._dateAdapter
      .format(this._calendar.activeDate, 'yyyy');
  
    return `${monthName} ${year}`;
  }

  previousClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, -1)
  }

  nextClicked() {
    this._calendar.activeDate = this._dateAdapter.addCalendarMonths(this._calendar.activeDate, 1)
  }

}
