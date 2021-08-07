const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars') 
const bodyParser = require('body-parser') 
const methOverride = require('method-override') 
const isEqual = require('./tools/handlebarsHelper')

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000

app.use(express.static('public'))

app.engine('handlebars', exphbs({ 
  defaultLayout: 'main',
  helpers: { isEqual }
  }))
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methOverride('_method'))


usePassport(app)
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`)
})