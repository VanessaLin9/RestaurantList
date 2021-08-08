const express = require('express')
const router = express.Router()

const Res = require('../../models/restaurant') //載入restaurant model

const sortList = {
  _id: {
    value: '_id',
    title: '新增時間',
    mongoose: { _id: 'asc' }
  },
  nameAsc: {
    value: 'nameAsc',
    title: 'A->Z',
    mongoose: { name_en: 'asc' }
  },
  nameDesc: {
    value: 'nameDesc',
    title: 'Z->A',
    mongoose: { name_en: 'desc' }
  },
  category: {
    value: 'category',
    title: '類別',
    mongoose: { category: 'asc' }
  },
  location: {
    value: 'location',
    title: '地區',
    mongoose: { location: 'asc' }
  },
  rating: {
    value: 'rating',
    title: '最高評分',
    mongoose: { rating: 'desc' }
  }
}


router.get('/', (req, res) => {
  const userId = req.user._id
  Res.find({ userId })
    .lean() 
    .sort({ _id: 'asc' }) 
    .then(resList => res.render('index', { resList, sortList }))
    .catch(error => console.error(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = new RegExp(req.query.keyword.trim(), 'i')
  Res.find({ userId, $or: [{ name: keyword }, { category: keyword }] })
    .lean()
    .sort(sortList[req.query.sortBy].mongoose)
    .then(resList => {
      if (resList.length > 0) {
        res.render('index', { resList, sortList, query: req.query })
      } else {
        const noFind = `<h4>無相關搜尋結果</h4>`
        res.render('index', { noFind, query: req.query })
      }
    })
    .catch(error => console.log(error))
})



module.exports = router