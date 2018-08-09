const config = require('../config')
const express = require('express')
const validation = require('express-validation')
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

// error handler
app.use(function (err, req, res, next) {
    if (err instanceof validation.ValidationError) return res.status(err.status).json(err);
    if (process.env.NODE_ENV !== 'production') {
        return res.status(500).send(err.stack);
    } else {
        return res.status(500);
    }
});

const httpServer = http.createServer(app).listen(process.env.PORT || config.port, function () {
    const host = httpServer.address().address
    const port = httpServer.address().port
    console.log('Web server started at http://%s:%s', host, port)
});

module.exports = (redis) => {
    require('./routes')(app, redis, validation)
}