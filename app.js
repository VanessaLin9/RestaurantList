const express = require('express')

const port = 3000
const exphbs = require('express-handlebars') //使用handlebar
const bodyParser = require('body-parser') // 引用 body-parser
const methOverride = require('method-override') //載入method-override

// 引用路由器
const routes = require('./routes')
const app = express()

require('./config/mongoose')



app.use(express.static('public'))


// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//設定每一筆請求都會通過method override進行前處理
app.use(methOverride('_method'))




// 將 request 導入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`Express is listen on localhost:${port}`)
})