const request = require('postman-request')

const forecast = (query, callback) => {
    var url = `http://api.weatherstack.com/current?access_key=392a4133c95f40905cd0604d93559f2e&query=${encodeURIComponent(query)}`

    request({url: url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback("Unable to connect to the weather service!", undefined)
        } else if( body.success !== undefined && !body.success) {
            callback(`Code: ${body.error.code}\nType: ${body.error.type}/nInfo: ${body.error.info}`, undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = {
    forecast: forecast
}