// Imports
import express, {Request, Response} from "express";
const router = express.Router();
require('dotenv').config();
import cors from "cors";
const bodyParser = require("body-parser");
const helmet = require('helmet');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000;

// Codebase imports
import { startMongo, printMongooseState } from "./config/database";

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static(path.join(__dirname, 'public')));

// Security
app.disable('x-powered-by') // Reduce fingerpinting

// Database
startMongo().then(() => {
  printMongooseState();
});


// Routes
app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

// Start server
app.listen(port, () => {
  console.info(`Backend server is listening on http://localhost:${port}`);
});