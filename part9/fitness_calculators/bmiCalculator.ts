const parseBMIArgs = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};


const BMIrange = (height: number, weight: number) => {
    const BMIvalue = (a: number, b: number): number => {
        return (b / (a/100 * a/100));
      };
    
    const value = BMIvalue(height, weight);

    if (value < 18.5) {
        return "Small range";
    } else if (value <= 24.9 && value >= 18.5) {
        return "Normal range";
    } else if (value <= 29.9 && value >= 25) {
        return "Large-ish range";
    } else {
        return "Large range";
    }
};
  
if (require.main === module) {
  try {
    const { value1, value2 } = parseBMIArgs(process.argv);
    console.log("BMI range:", BMIrange(value1, value2));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}


export default BMIrange;