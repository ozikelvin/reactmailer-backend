const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const router = require('./route/route')
const cors = require('cors');
const { urlencoded } = require('express');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.json({Message: 'Api is working fine'})
})

app.use(router)

app.listen(port, ()=>{
    console.log(`SERVER IS LISTENING TO PORT ${port}`)
})