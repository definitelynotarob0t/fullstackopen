interface Result {
    periodLength: number;
    trainingDays: number,
    totalHours: number,
    average: number,
    success: boolean,
    evaluationDescription: string,
    target: number
}

const parseExerciseArgs = (daily_exercises: number[], userTarget: number): Result => {
    if (daily_exercises.length === 0) throw new Error('Not enough arguments');
  
    if (daily_exercises.every(arg => !isNaN(Number(arg)))) {
        const userInput = daily_exercises;

        let total = 0;
        for (let i = 0; i < userInput.length; i++) {
            total += userInput[i];
        }
        const average = total / userInput.length;

        let evaluation = false;
        let description = "Bow bow";
        if (average >= userTarget) {
            evaluation = true;
            description = "You did it!";
        } 

      return {
        periodLength: userInput.length,
        trainingDays: (userInput.filter(day => day > 0)).length, 
        totalHours: total,
        average,
        success: evaluation,
        evaluationDescription: description, 
        target: userTarget
      };

    } else {
      throw new Error('Provided values were not numbers');
    }
  };


  if (require.main === module) {
    try {
      const args = process.argv.slice(2).map(arg => Number(arg));
      const targetHours: number = Number(args.pop());
      const result = parseExerciseArgs(args, targetHours);
      console.log(result);
    } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
    }
  }

export default parseExerciseArgs