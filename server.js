const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

//Express Middleware
app.use(express.json());

//DB Config
const db = config.get('mongoURI');

//DB Connection
mongoose
    .connect(db,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(()=> console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on ${port}`));