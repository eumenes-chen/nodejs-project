const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express()
app.listen(9090)

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());



app.use('/api',require('./routes/api'))

