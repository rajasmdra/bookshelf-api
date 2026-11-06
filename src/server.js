import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const port = 9000;
const host = 'localhost';

app.use(cors());
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}`);
});