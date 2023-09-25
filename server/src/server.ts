// Imports
const express = require('express')
require('dotenv').config()

// Codebase imports
import { startMongo } from "./config/database"

const app = express()
const port = process.env.PORT

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`\nServer listening on ${port}\n`)
})