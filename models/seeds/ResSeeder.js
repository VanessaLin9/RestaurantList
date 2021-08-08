const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant') 
const User = require('../user')
const db = require('../../config/mongoose')

const resList = require('./restaurant.json').results
const restaurant = require('../restaurant')

const SEED_USERs = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678',
  ownRestaurants:[1, 2, 3]},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678',
  ownRestaurants: [4, 5, 6]
}]



db.once('open', () => {
 
  Promise.all(SEED_USERs.map(SEED_USER =>
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))

    .then(user => {    
        const userRestaurant = resList.filter(restaurant => SEED_USER.ownRestaurants.includes(restaurant.id))
        userRestaurant.forEach(restaurant => {restaurant.userId = user._id})
      return Restaurant.create(userRestaurant)
        })
  ))
    .then(() => {
      console.log('done.')
      process.exit()
    })
  .catch(error => console.log(error))
})


