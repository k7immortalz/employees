import { DBSchema } from 'idb';

export interface EmployeeDB extends DBSchema{
    'employee-store':{
      key : string,
      value: {
        employeeName: string,
        employeeRoll: string,
        employeeWorkingDate: Date
      }
    };
  } 
