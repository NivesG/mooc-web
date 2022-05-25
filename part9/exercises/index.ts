/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculator } from './calculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json()); // To parse the incoming requests with JSON payloads

/*
interface Forma {
  weight: Number;
  height: Number;
  bmi: String;
}

*/

app.get('/hello', (_req, res) => {
  res.send('hello full stack');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height) {
    const errorMessag = 'parameters missing';
    res.send({errorMessag});
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
     const errorMessag = 'provided values are not numbers';
     res.send({errorMessag});
  }

  const resulta = calculateBmi(Number(height), Number(weight));
  res.send({weight, height, resulta});
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
  const { value1, value2, op } = req.body;
  /*
  if ( !value1 || isNaN(Number(value1))) {
    return res.send({ error: '...'}).status(400);
  }
  if ( !value2 || isNaN(Number(value2))) {
    return res.send({ error: '...'}).status(400);
  }

  */
 
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculator(value1, value2, op);
  res.send(result);
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any,  @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: any = req.body;
  const target2 = Number(target);
  
  if ( !target || !daily_exercises) {
    return res.send({ error: 'target parameters missing'}).status(400);
  }
  if  (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    return res.send({ error: 'malformatted parameters'}).status(400);
  }

  const isNumber = daily_exercises.every((exse: number) => typeof exse == 'number');
  
  if(!isNumber) {
    return res.send({ error: 'malformatted parameters'}).status(400);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const resulte = calculateExercises(daily_exercises, target2);
  res.send(resulte);
});







const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});