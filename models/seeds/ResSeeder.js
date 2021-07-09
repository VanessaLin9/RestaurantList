const mongoose = require('mongoose')
const Res = require('../restaurant') //載入restaurant model
const resList = require('./restaurant.json')
mongoose.connect('mongodb://localhost/RestaurantList', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 8; i++) {
    let reslist = resList.results[i]
    Res.create({
      name: reslist.name,
      name_en: reslist.name_en,
      category: reslist.category,
      image: reslist.image,
      location: reslist.location,
      phone: reslist.phone,
      google_map: reslist.google_map,
      rating: reslist.rating,
      description: reslist.description
    })
  }
  console.log('done')
})


