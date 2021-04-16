const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const router = require('./route/route')
const mongoose = require('mongoose')
const Db  = require('./config/db');
const cookie = require('cookie-parser');

const cors = require('cors');


app.use(cors())
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    res.json({Message: 'Api is working fine'})
})

app.use(router)

app.listen(port, ()=>{
    console.log(`SERVER IS LISTENING TO PORT ${port}`)
})