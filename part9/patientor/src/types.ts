//export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

//export type Visibility = 'great' | 'good' | 'ok' | 'poor';




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

export type PatientRedu = Omit<Patient, "ssn" | "entries">;