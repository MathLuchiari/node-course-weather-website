const request = require('postman-request')

const geoCode = ( address, callback ) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibHVjaHNreXdhbGtlciIsImEiOiJja2lzMGp6MzYwZWFiMnFxajk3cnE2bDdnIn0.TNeFO9m-PuUaITR0VfO3GA&limit=1`

    request({url: url, json: true}, (error, { body } = {}) => {
        var { features } = body
        if(error) {
            callback('Unable to connect to the weather service!', undefined);
        } else if(features.length === 0) {
            callback('Unable to find the location. Try another search', undefined)
        } else {
            callback(undefined, {
                latitude:  features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name
            })
        }
    })
}

module.exports = {
    geoCode: geoCode
}