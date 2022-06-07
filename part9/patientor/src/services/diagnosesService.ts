import diagnosesData from '../data/diagnoses.json';
import { DiagnoseEntry } from '../types';


const diagnoses: Array<DiagnoseEntry> = diagnosesData as Array<DiagnoseEntry>;

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary
};