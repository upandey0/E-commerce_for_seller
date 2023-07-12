const express = require('express');
const connectionWithDb  = require('./Config/dbConnection')
const sellerauthRoute = require('./Router/retailerRoute')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config();
const mongooseURI = process.env.MONGOOSE_URI;

const app = express();

connectionWithDb(mongooseURI)

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use(cookieParser())
app.use(express.json())

app.use('/',sellerauthRoute)

// app.get('/',(req,res)=>{
//     res.send("<h1>Hello Ji</h1>")
// })

module.exports = app