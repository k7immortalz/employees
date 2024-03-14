import { Component, Injectable, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCalendarBody } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  MatDateRangeSelectionStrategy,
  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { DatePickerHeaderComponent } from '../date-picker-header/date-picker-header.component';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker'; 
import {MatDatepicker} from '@angular/material/datepicker';

class CustomDateAdapter extends MomentDateAdapter {
  override getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  }
}

const moment = _rollupMoment || _moment;


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};







@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
   DatePickerHeaderComponent,
   MatNativeDateModule],
  providers: [
    DatePipe,
    provideMomentDateAdapter(MY_FORMATS),
    {provide: DateAdapter, useClass: CustomDateAdapter, deps: [MAT_DATE_LOCALE]},
  ],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})



export class DatePickerComponent {



  header = DatePickerHeaderComponent;

  chosenDate = new Date(2024, 3, 25); 
  
  selectedDate: any = new Date();

  
  
  constructor(private datePipe: DatePipe,private dateAdapter: DateAdapter<Date>) {
    
  }

  


  getFormattedDate(): any {
    return this.datePipe.transform(this.selectedDate, 'dd-MMM-yyyy');
  }

  getNextMonday(): any{
    console.log("a");
    const selectedDate = moment(this.selectedDate).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    const today = new Date(selectedDate);
    const dayOfWeek = today.getDay();
    const daysUntilNextMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday);
    const result = moment(nextMonday);
    return result
  }
  subm(val:any){
console.log(val)
  }

  getChangedValue(e:any)  {
    console.log(e); // this is always "undefined"
  }
  

}
