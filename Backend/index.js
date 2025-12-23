const express = require('express')
const routes = require('./Route')
const app = express()
require('dotenv').config()

const PORT = process.env.PORT || 4000
const dbconnection = require('./Config/db.js')
dbconnection()

// ✅ SAFE JSON PARSING
app.use(express.json({ strict: false }))
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`)
})
