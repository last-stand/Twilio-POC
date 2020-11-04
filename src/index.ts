import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes'
const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use( '/', router);

app.listen(PORT, () => {
    console.log( `server started at http://localhost:${ PORT }` );
} );