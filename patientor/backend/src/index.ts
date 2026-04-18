import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses.ts';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('meow');
});

app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});