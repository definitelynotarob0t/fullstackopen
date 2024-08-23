import express from 'express';
import BMIrange from './bmiCalculator';
import parseExerciseArgs from './exerciseCalculator';


const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight)) {
        res.status(400).send({ error: 'malformatted parameters' });
        return;
    }

    try {
        const bmi = BMIrange(height, weight);
        res.send({ weight, height, bmi });
    } catch(error) {
        res.status(500).send ({ error: "an error occured" });
    }
});

interface ExerciseRequestBody {
    daily_exercises: number[];
    target: number;
  }

app.post('/exercises', (req, res) =>  {
    const { daily_exercises, target } = req.body as ExerciseRequestBody
    
    if (!daily_exercises || !target) {
        res.status(400).send({ error: "parameters missing" })
    } else if (
        !Array.isArray(daily_exercises) 
        || !daily_exercises.every((exercise) => typeof exercise === 'number') 
        || isNaN(target) ) {
        res.status(400).send({ error: "malformatted parameters" })
    }

    
    try {
        const results = parseExerciseArgs(daily_exercises, target)
        res.send(results)
        console.log(results)
    } catch (error) {
        res.status(500).send({ error: "unexpected error" })
    }

})

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
