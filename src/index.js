const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const routes = require('./app.js') 
const cors = require('cors');


app.use(express.json());
app.use(cors({origin:'*'}));
app.use('/api',routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})