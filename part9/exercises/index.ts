import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculator } from './calculator';
const app = express();

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
  const { weight, height } = req.query
  if (!weight || !height) {
    let errorMessag = 'parameters missing'
    res.send({errorMessag});
  }

  if (isNaN(Number(weight)) || isNaN(Number(height))) {
     let errorMessag = 'provided values are not numbers'
     res.send({errorMessag});
  }

  const resulta = calculateBmi(Number(height), Number(weight))
  res.send({weight, height, resulta});
});

app.post('/calculate', (req, res) => {
  const { value1, value2, op } = req.body;

  const result = calculator(value1, value2, op);
  res.send(result);
});







const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});