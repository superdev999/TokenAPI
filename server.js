const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
var cors = require('cors')
const app = express();
app.use(cors())
// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World'));

// Use Routes
app.use('/api/users', users);


const port = process.env.PORT || 3003;

app.listen(port, '127.0.0.1',() => console.log(`Server running on port ${port}`));
// npm run server
