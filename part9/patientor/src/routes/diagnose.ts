/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import diagnosesService from "../services/diagnosesService";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;