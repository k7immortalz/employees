import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { EmployeeDB } from '../employeeDB/employee-list';
import { Observable, from, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {

  private db!: IDBPDatabase<EmployeeDB>;

  constructor() { }

  // Connect to DB
  async connectDb(): Promise<void> {
    this.db = await openDB<EmployeeDB>('Employee-Db', 1, {
      upgrade(db) {
        db.createObjectStore('employee-store', { keyPath: 'id', autoIncrement: true });
      },
    });
  }

  // Close the DB
  closeDb(): void {
    if (this.db) {
      this.db.close();
    }
  }

  // Add employee Data
  addEmployee(employee: {
    value: {
      employeeName: string;
      employeeRoll: string;
      employeeWorkingDate: Date;
    };
  }): Observable<any> {
    return from(this.connectDb()).pipe(
      switchMap(() =>
        from(this.db.add('employee-store', employee.value)).pipe(
          catchError((error) => {
            console.error('Error adding employee:', error);
            return throwError(() => new Error('Failed to add employee'));
          })
        )
      ),
      finalize(() => this.closeDb())
    );
  }

  // Get employee Data
  getEmployee(key: string): Observable<any> {
    return from(this.connectDb()).pipe(
      switchMap(() =>
        from(this.db.get('employee-store', key)).pipe(
          catchError((error) => {
            console.error('Error getting employee:', error);
            return throwError(() => new Error('Failed to get employee'));
          })
        )
      ),
      finalize(() => this.closeDb())
    );
  }

  // Get all employees Data
  getAllEmployees(): Observable<any[]> {
    return from(this.connectDb()).pipe(
      switchMap(() =>
        from(this.db.getAll('employee-store')).pipe(
          catchError((error) => {
            console.error('Error getting all employees:', error);
            return throwError(() => new Error('Failed to get all employees'));
          })
        )
      ),
      finalize(() => this.closeDb())
    );
  }

  // Edit employee Data
  updateEmployee(employee: {
    key: string;
    value: {
      employeeName?: string;
      employeeRoll?: string;
      employeeWorkingDate?: Date;
    };
  }): Observable<any> {
    return from(this.connectDb()).pipe(
      switchMap(() =>
        from(this.db.get('employee-store', employee.key)).pipe(
          switchMap((storedEmployee) => {
            if (storedEmployee) {
              Object.assign(storedEmployee, employee.value);
              return from(this.db.put('employee-store', storedEmployee)).pipe(
                catchError((error) => {
                  console.error('Error updating employee:', error);
                  return throwError(() => new Error('Failed to update employee'));
                })
              );
            } else {
              return throwError(() => new Error('Employee not found'));
            }
          })
        )
      ),
      finalize(() => this.closeDb())
    );
  }

  // Delete employee Data
  deleteEmployee(key: string): Observable<any> {
    return from(this.connectDb()).pipe(
      switchMap(() =>
        from(this.db.delete('employee-store', key)).pipe(
          catchError((error) => {
            console.error('Error deleting employee:', error);
            return throwError(() => new Error('Failed to delete employee'));
          })
        )
      ),
      finalize(() => this.closeDb())
    );
  }
}
