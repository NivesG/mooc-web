/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../data/patients.json';
import { PatientRedu, Patient, newPatient } from '../types';


import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const id: string = uuid();


const patients: Array<PatientRedu> = patientsData as Array<PatientRedu>;
const patients2: Array<Patient> = patientsData as Array<Patient>;

const getEntries = (): Array<PatientRedu> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getOneEntry = (id: string): Patient | undefined => {
  let patient = patients2.find((pat) => pat.id === id);
  if (patient && !patient?.entries) {
    patient = {
      ...patient,
      entries: [],
    };
  }
  return patient;
};

const addPatient = (entry: newPatient): Patient => {
  const newPatient = {
    id,
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addPatient,
  getOneEntry
};