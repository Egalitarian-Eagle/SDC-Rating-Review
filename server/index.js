const express = require('express')
const app = express()
const router = require('./routes/index.js')
const port = 3002

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', router)


// Port console.log
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})