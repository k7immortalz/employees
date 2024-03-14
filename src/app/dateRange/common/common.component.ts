import {Component, Injectable} from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker'; 


@Injectable()
export class FiveDayRangeSelectionStrategy<D>{
  constructor(private _dateAdapter: DateAdapter<D>) {}

  selectionFinished(date: D | null) {
    console.log(date);
    return this._createFiveDay(date);
  }

  createPreview(activeDate: D | null) {
    return this._createFiveDay(activeDate);
  }

  private _createFiveDay(date: D | null) {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, -5);
      return start;
    }

    return null;
  }
}

@Component({
  selector: 'app-common',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatDatepickerModule,MatFormFieldModule,MatMomentDateModule],
  providers: [{
    provide: MAT_DATEPICKER_SCROLL_STRATEGY,
    useClass: FiveDayRangeSelectionStrategy
  }],
  templateUrl: './common.component.html',
  styleUrl: './common.component.scss'
})
export class CommonComponent {

}
