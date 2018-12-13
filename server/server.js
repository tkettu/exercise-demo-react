//const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
//const jwt = require('jsonwebtoken')

const loginController = require('./controllers/login')
const userController = require('./controllers/users')

const server = jsonServer.create()

const router = jsonServer.router('db.json')

//const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(jsonServer.defaults())
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())


//LOGIN
server.post('/api/login', (req, res) => {
    loginController.loginPost(req, res)
})

//REGISTER
server.post('/api/users', (req, res) => {
    userController.userPost(req, res)
})

server.use((req,res,next) => {
    loginController.loginUse(req, res, next)
})

server.use((req, res, next) => {
    userController.userUse(req, res, next)
})

const PORT = 3001
server.use('/api', router)
server.listen(PORT, () => {
    console.log(`JSON serveri on runninki portissa ${PORT}`)
})