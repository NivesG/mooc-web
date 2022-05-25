

type Result = string;

export const calculateBmi = (a: number, b: number): Result => {
  const bmi = a / (b/100 * b/100);
  console.log(bmi);
  
  if (bmi > 18.5 && bmi < 24.9) {
     return 'Normal (healthy weight)';
        
  } else if (bmi <= 18.5) {  
    return 'Underweight'
    
  } else {
    return 'Overweight'
      }
  }


//const a: number = Number(process.argv[2])
//const b: number = Number(process.argv[3])
//console.log(calculateBmi(a, b));
