import express from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
    res.send('meow');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});