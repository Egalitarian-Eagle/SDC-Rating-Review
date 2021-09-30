const express = require('express')
const app = express()
const port = 3001

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// get routers
app.get('/', (req, res) => {
  res.send('Hello World!')
})


// Port console.log
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})