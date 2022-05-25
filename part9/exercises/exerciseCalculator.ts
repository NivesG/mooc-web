interface Output {
  periodLength: Number;
  trainingDays: Number;
  success: Boolean;
  avarage: number;
  target: number;
  rating: number;
  ratingDescription: String;
}



const calculateExercises = (args: Array<number>, targetValue: number): Output => {
  if (args.length < 1) throw new Error('Not enough arguments');
  if (!targetValue) throw new Error('target value must be proveided and number');
  const periodLength = args.length

  args.map((day) => {
    if (isNaN(Number(day))) {
      throw new Error('Provided values were not numbers!');
    }
    
  })
  const trainingDays = args.filter((exerciseHour) => exerciseHour > 0)
    .length;

  let avg: number = 0
  let sum: number = 0

  for (let i = 1; i < periodLength; i++) {
    sum += args[i]
  }

  avg = sum / periodLength

  const success = avg > targetValue

  let rating: number = 0
  let radingDesc: String = ''
  
  if (avg < targetValue) {
    rating = 1
    radingDesc =  'you didnt reach your exercise goals this week'
  } else if (avg === targetValue) {
    rating = 3
    radingDesc = 'you accomplished your goals for this week'
  } else if (avg > targetValue) {
    rating = 5
    radingDesc = 'you did more than planned, exelent job!'
  }
  
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    avarage: avg,
    target: targetValue,
    rating: rating,
    ratingDescription: radingDesc
  }
}

const target: number = Number(process.argv[2])
let result: Array<number> = [];

for (var i = 3; i < process.argv.length; i++){
    result.push(Number(process.argv[i]));
}

console.log(result);

try {
  console.log(calculateExercises(result, target));

} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
  
}


