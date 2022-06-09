/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
//import diagnosesService from "../services/diagnosesService";
import patientsService from "../services/patientsService";
import toNewPatientEntry from '../utils';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post('/', (_req, res) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatientEntry(_req.body);
    const addedEntry = patientsService.addPatient(newPatient);
    res.json(addedEntry);
  }catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;