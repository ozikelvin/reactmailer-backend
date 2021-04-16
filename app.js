const express = require('express');
const app = express();
const port = process.env.PORT;
const router = require('./route/route')
const { doMongo } = require('./config/db')
const cookie = require('cookie-parser');
const cors = require('cors');


require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended: true}));

/// Connect to mongo
doMongo();

app.get('/', (req, res)=>{
    res.json({Message: 'Api is working fine'})
})

app.use(router)

app.listen(port, ()=>{
    console.log(`SERVER IS LISTENING TO PORT ${port}`)
})