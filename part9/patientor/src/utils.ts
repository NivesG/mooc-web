import { Fields, Gender, newPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing string');
  }

  return name;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseDate = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};


/*
const toNewPatientEntry = (object: unknown): newPatient=> {
  const newEntry: newPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseName(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseName(object.ssn),
   
  };

  return newEntry;
};

*/

const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): newPatient => {
  const newEntry: newPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseName(ssn),
    gender: parseGender(gender),
    occupation: parseName(occupation),
    entries: [],
  };

  return newEntry;
};



export default toNewPatientEntry;