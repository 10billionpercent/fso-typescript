import express from 'express';
import isNotNumber from './utils.ts';
import calculateBmi from './bmi/bmiCalculator.ts';

const app = express();

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

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});