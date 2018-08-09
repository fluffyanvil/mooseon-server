module.exports = (app, redis, validation) => {
    require('./listens')(app, redis, validation)
    require('./nears')(app, redis, validation)
}