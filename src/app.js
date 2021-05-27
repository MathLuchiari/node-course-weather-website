const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express() 
const chalk = require('chalk') 
const geocode = require ('./utils/geocode.js');
const forecast = require ('./utils/forecast.js');

//Define path for express config
const publicDiretoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDiretoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Matheus Miranda Luchiari'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Page",
        name: 'Matheus Miranda Luchiari'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        heplMessage: 'This is the help message...',
        name: 'Matheus Miranda Luchiari'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send( {
            error: "You must provide a address!"
        });
    }

    geocode.geoCode(req.query.address, (error, {location:locationReturned} = {}) => {
        if(error) {
            return res.send( {error: error })
        }
    
        forecast.forecast(locationReturned, (error, { current } = {}) => {
            if(error) {        
                return res.send( {error: error })
            }
    
            res.send({
                forecast: current,
                locationReturned,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send( {
            Error: "You must provide a search term!"
        });
    }

    res.send( {
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.send('Help article not found')
})

app.get('*', (req, res) => {
    res.render('help', {
        title: "404",
        errorMessage: 'Page not found',
        name: 'Matheus Miranda Luchiari'
    })})

app.listen(3000, () => {
    console.log("The server is up on port 3000")
})