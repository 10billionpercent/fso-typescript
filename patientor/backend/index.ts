import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
    res.send('meow');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});