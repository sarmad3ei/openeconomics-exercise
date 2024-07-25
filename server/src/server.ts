import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { initDB } from './services/dbService';
import { specieRoutes, defaultRoutes } from './routes';

const app = express();
const port = 3000;

initDB();

app.use(morgan('dev'));
app.use(express.json()); 
app.use(cors());

app.use('/api/species', specieRoutes); 

app.use('/', defaultRoutes);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
