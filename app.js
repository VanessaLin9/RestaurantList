const express = require('express')
const app = express()
const port = 3000

//載入method-override
const methOverride = require('method-override')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/RestaurantList', { useNewUrlParser: true, useUnifiedTopology: true })


const Res = require('./models/restaurant') //載入restaurant model

//使用handlebar
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// 引用 body-parser
const bodyParser = require('body-parser')
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
//設定每一筆請求都會通過method override進行前處理
app.use(methOverride('_method'))
// 將 request 導入路由器
// app.use(routes)


//取得資料庫連線狀態
const db = mongoose.connection
//連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Res.find() //取出Res model裡面的資料
    .lean() //把mongoose拿出來的資料弄成乾淨的JS資料陣列
    .then(resList => res.render('index', { resList }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Res.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Res.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Res.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description
  return Res.findById(id)
    .then(res => {
      res.name = name
      res.name_en = name_en
      res.category = category
      res.image = image
      res.location = location
      res.phone = phone
      res.google_map = google_map
      res.rating = rating
      res.description = description
      return res.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Res.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Res.findOne({ name: keyword })
    .then(resList => {
      res.render('index', { resList })
    })
    .catch(error => console.log(error))

  //(restaurant => res.render(restaurantList.results.filter(restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase()) + restaurant.category.toLocaleLowerCase().includes(keyword.toLowerCase()))))
  // res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`)
})