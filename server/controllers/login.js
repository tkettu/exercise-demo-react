//const fs = require('fs')
const jwt = require('jsonwebtoken')
const db = require('../helpers/dbhelper')

const userdb = db.userdb//JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

const SECRET_KEY='V3R153K9E7'
const expiresIn = '1h'

const createToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY/*, {expiresIn} */  )
}

const verifyToken = (token) => {
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

const isAuthenticated = ({email, password}) => {
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

const loginPost = (req, res) => {
    const {username, password} = req.body
    console.log('POSTATAAN  LOGIN PYYNTÖ', username, password)
    if (!isAuthenticated({username, password})){
        const status = 401
        const message = 'Käyttäjätunnus tai salasana virheellinen'
        //res.status(status).json({status, message})
        res.status(status).json({status, message})
        return
    }
    const access_token = createToken({username, password})
    res.status(200).json({access_token, username})
}

const loginUse = (req, res, next) => {
    if (req.headers.authorization === undefined 
        || req.headers.authorization.split(' ')[0] 
        !== 'Bearer'){
            const status = 401
            const message = 'Bad authorization header'
            res.status(status).json({status, message})
            return
        }
        try {
            verifyToken(req.headers.authorization.split(' ')[1])
            next()
        } catch (err) {
            const status = 401
            const message = 'Error: access_token is not valid'
            res.status(status).json({status, message})
        }
}

module.exports = { loginPost, loginUse }