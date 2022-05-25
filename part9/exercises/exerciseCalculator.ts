interface Output {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  avarage: number;
  target: number;
  rating: number;
  ratingDescription: string;
}



export const calculateExercises = (args: Array<number>, targetValue: number): Output => {
  if (args.length < 1) throw new Error('Not enough arguments');
  if (!targetValue) throw new Error('target value must be proveided and number');
  const periodLength = args.length;

  args.map((day) => {
    if (isNaN(Number(day))) {
      throw new Error('Provided values were not numbers!');
    }
    
  });
  const trainingDays = args.filter((exerciseHour) => exerciseHour > 0)
    .length;

  let avg = 0;
  let sum= 0;

  for (let i = 1; i < periodLength; i++) {
    sum += args[i];
  }

  avg = sum / periodLength;

  const success = avg > targetValue;

  let rating = 0;
  let radingDesc = '';
  
  if (avg < targetValue) {
    rating = 1;
    radingDesc =  'you didnt reach your exercise goals this week';
  } else if (avg === targetValue) {
    rating = 3;
    radingDesc = 'you accomplished your goals for this week';
  } else if (avg > targetValue) {
    rating = 5;
    radingDesc = 'you did more than planned, exelent job!';
  }
  
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    avarage: avg,
    target: targetValue,
    rating: rating,
    ratingDescription: radingDesc
  };
};

/*
const target = Number(process.argv[2]);
const result: Array<number> = [];

for (let i = 3; i < process.argv.length; i++){
    result.push(Number(process.argv[i]));
}

console.log(result);

try {
  console.log(calculateExercises(result, target));

} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
  
}

*/
