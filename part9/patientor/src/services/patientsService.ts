import patientsData from '../data/patients.json';
import { PatientRedu } from '../types';


const patients: Array<PatientRedu> = patientsData as Array<PatientRedu>;

const getEntries = (): Array<PatientRedu> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};