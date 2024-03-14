import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesTableComponent } from './employee/employees-table/employees-table.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { DatePickerComponent } from './common/date-picker/date-picker.component';
import { CommonComponent } from './dateRange/common/common.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,EmployeesTableComponent,EmployeeAddComponent,DatePickerComponent,CommonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'employees';
}
