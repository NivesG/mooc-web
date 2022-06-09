//export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

//export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}


export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
}

export type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
};

export type newPatient = Omit<Patient, 'id'>;

export type PatientRedu = Omit<Patient, 'ssn' | 'entries'>;