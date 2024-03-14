import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [FontAwesomeModule,MatButtonModule,MatToolbarModule],
  templateUrl: './employees-table.component.html',
  styleUrl: './employees-table.component.scss'
})
export class EmployeesTableComponent {

  faPlus = faPlus;

}
