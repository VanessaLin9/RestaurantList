const express = require('express')
const router = express.Router()

const Res = require('../../models/restaurant') //載入restaurant model

router.get('/', (req, res) => {
  Res.find() //取出Res model裡面的資料
    .lean() //把mongoose拿出來的資料弄成乾淨的JS資料陣列
    .then(resList => res.render('index', { resList }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Res.findOne({ name: keyword })
    .then(resList => {
      res.render('index', { resList })
    })
    .catch(error => console.log(error))

  //(restaurant => res.render(restaurantList.results.filter(restaurant.name.toLocaleLowerCase().includes(keyword.toLowerCase()) + restaurant.category.toLocaleLowerCase().includes(keyword.toLowerCase()))))
  // res.render('index', { restaurant: restaurant, keyword: keyword })
})


module.exports = router