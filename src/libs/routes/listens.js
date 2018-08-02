const path = '/listen'
module.exports = (app, redis) => {
    const georedis = require('georedis').initialize(redis)
    
    /*
    expected body

    {
        user: string,
        lng: Number,
        lat: Number,
        "artist": "Пневмослон",
        "track": "Ебаный Серега"
    }
    
    */
    app.post(path, (req, res) => {    
        const current = req.body
        const key = current.user
        georedis.addLocation(key, {
            latitude: current.lat,
            longitude: current.lng
        }, function (err, reply) {
            if (err) console.error(err)
            else {
                redis.set(key, JSON.stringify(current), 'EX', 10 * 60)
                res.status(200).json(current)
            }
        })
    })
}