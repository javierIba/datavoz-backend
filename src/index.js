const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const routes = require('./app.js')
const cors = require('cors');
const fileUpload = require('express-fileupload')

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }));
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})