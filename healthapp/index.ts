import express from 'express';

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

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})