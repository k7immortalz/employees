import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';


@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [MatButtonModule,MatDatepickerModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss'
})
export class EmployeeAddComponent {

}
