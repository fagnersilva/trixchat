const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const expressSession = require('express-session')
const expressValidator = require('express-validator')
const bodyParser = require('body-parser')
const hbs = require('express-hbs')

module.exports = (app) => {
    app.set('port', 80)
    app.set('host', 127.0.0.1)
    app.set('views', path.join(__dirname, './../../../dist/views'))
    app.set('view engine', 'hbs')
    app.set('views', path.join(__dirname, './../../../dist'))    
    
    app.use(morgan('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false, limit: '200kb'}))
    app.use(methodOverride('_method'))
    app.use(expressSession({
        secret: '!@#$%TREQDFG&ˆ$ˆ&!@$%@$%&',
        resave: false,
        saveUninitialized: false
    }))
    app.use(expressValidator())

    app.engine('hbs', hbs.express4({
        defaultLayout: path.join(app.get('views'), 'layouts/main.hbs'),
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts')
    }))
}