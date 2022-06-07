/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import diagnosesRouter from './routes/diagnose';
import patientsRouter from "./routes/patients";
const app = express();
app.use(express.json());

const cors = require('cors');

app.use(cors());
const PORT = 3001;






app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});