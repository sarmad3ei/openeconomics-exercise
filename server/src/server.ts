import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello')
})
app.get('/regions', async (req, res) => {
});

app.get('/species', async (req, res) => {
});

app.get('/displaySpecies', (req, res) => {
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
