const path = '/near'
module.exports = (app, redis) => {
    const georedis = require('georedis').initialize(redis)
    const options = {
        withCoordinates: true, // Will provide coordinates with locations, default false
        withHashes: false, // Will provide a 52bit Geohash Integer, default false
        withDistances: true, // Will provide distance from query, default false
        order: 'ASC', // or 'DESC' or true (same as 'ASC'), default false
        units: 'm', // or 'km', 'mi', 'ft', default 'm'
        count: 100, // Number of results to return, default undefined
        accurate: false // Useful if in emulated mode and accuracy is important, default false
    }
    app.get(path, (req, res) => {
        const params = req.query
        georedis.nearby({
            latitude: params.lat,
            longitude: params.lng
        },
        params.radius,
        options,
        function (err, locations) {
            if (err) console.error(err)
            else {                
                const keys = locations.map(l => l.key)
                redis.mget(keys, function (err, obj) {
                    if (obj === undefined){
                        res.status(500).json([])
                        return
                    }
                    
                    const notnull = obj.filter(o => o)
                    const arr = notnull.map(o => {
                        const r = JSON.parse(o)
                        r.distance = locations.find(item => item.key === r.user).distance
                        return r
                    })
                    res.json(arr)
                 })
            }
        })
    })
}