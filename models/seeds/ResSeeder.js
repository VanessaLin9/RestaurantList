const Res = require('../restaurant') //載入restaurant model
const resList = require('./restaurant.json')
const db = require('../../config/mongoose')

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


