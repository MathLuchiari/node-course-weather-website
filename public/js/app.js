fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then( (data) => {
        console.log( data )
    })
})

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then( (data) => {
        if( data.error ) {

            console.log( data.error )
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message_one = document.querySelector('#message-one')
const message_two = document.querySelector('#message-two')

weatherForm.addEventListener( 'submit', (e) => {
    e.preventDefault();

    var location = search.value

    console.log( location )

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then( (data) => {
            if( data.error ) {
                message_one.textContent = data.error
                console.log( data.error )
            } else {

                console.log(data)
                message_one.textContent = data.locationReturned
                message_two.textContent = `${data.forecast.weather_descriptions[0]}.It's currently ${data.forecast.temperature} degrees out. There's a ${data.forecast.precip}% chance of rain`
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
} )