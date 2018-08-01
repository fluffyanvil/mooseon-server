module.exports = (app, redis) => {
    require('./listens')(app, redis)
    require('./nears')(app, redis)
}