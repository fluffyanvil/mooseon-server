const config = require('../config')
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const bodyParser = require('body-parser');

app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
})



const httpServer = http.createServer(app).listen(process.env.PORT || config.port, function () {
    const host = httpServer.address().address
    const port = httpServer.address().port
    console.log('Web server started at http://%s:%s', host, port)
});

module.exports = (redis) => {
    require('./routes')(app, redis)
}