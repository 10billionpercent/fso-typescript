import express from 'express';
import isNotNumber from './utils.ts';
import calculateBmi from './bmi/bmiCalculator.ts';
import calculateExercises from './exercise/exerciseCalculator.ts';

const app = express();
app.use(express.json());

interface exerciseData {
    daily_exercises : number[];
    target: number;
};

app.get('/hello', (_req, res) => {
    res.send(`
        <html>
        <body style="background-color: black;
        color: white;">
        <p> Hello Full Stack! </p>
        </body>
        </html>`);
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
        return res.status(400).json({
            error: 'malformatted parameters'
        });
    }

    const calculatedBmi = calculateBmi(Number(height), Number(weight));
    return res.status(200).json({
        height,
        weight,
        bmi: calculatedBmi
    });

});

app.post('/exercises', (req, res) => {
    const body = req.body as exerciseData;

    if (!body || body.daily_exercises === undefined || body.target === undefined) {
        return res.status(400).json({
            error: "missing parameters"
        });
    }

    const { daily_exercises, target } = body;

    if (!Array.isArray(daily_exercises) || daily_exercises.some(e => isNotNumber(e)) || isNotNumber(target)) {
        return res.status(400).json({
            error: "malformatted parameters"
        });
    }

    const calculatedExercises = calculateExercises(Number(target), daily_exercises);
    return res.status(200).json(calculatedExercises);
});

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});