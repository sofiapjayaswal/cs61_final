import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import routes from './routes.js';
import connectToDatabase from './db.js';

// initialize
const app = express();
const frontendUrl = 'https://cs61-final-frontend.onrender.com';
// const frontendUrl = 'http://localhost:3000'
// enable/disable cross origin resource sharing if necessary
app.use(cors({origin: frontendUrl, credentials: true}));

// enable/disable http request logging
app.use(morgan('dev'));

// enable only if you want templating
app.set('view engine', 'ejs');

// enable only if you want static assets from folder static
app.use(express.static('static'));

// this just allows us to render ejs from the ../app/views directory
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.set('views', path.join(__dirname, '../src/views'));

// enable json message body for posting data to API
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.use('', routes); // connect routes


// START THE SERVER
// =============================================================================
async function startServer() {
  try {
    const dbConnection = connectToDatabase(); // connect to database
    const port = process.env.PORT || 9090;
    app.listen(port);

    console.log(`Listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}

startServer();
