// Imports
const express = require('express')

// Codebase imports
import { startMongo } from "./config/database"

const app = express()
const port = 3000

app.get('/', (req:any, res:any) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`\nServer listening on ${port}\n`)
})