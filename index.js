const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const chkMiddleware = (req, res, next) => {
  if (req.query.age == '') {
    return res.redirect('/')
  } else {
    return next()
  }
}

app.get('/', (req, res) => {
  return res.render('myage')
})

app.get('/major', chkMiddleware, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', chkMiddleware, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.post('/check', (req, res) => {
  const age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

app.listen(3000)
