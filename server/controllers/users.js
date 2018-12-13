//const fs = require('fs')
const db = require('../helpers/dbhelper')
const userdb = db.userdb

const findUser = (username) => {
  return userdb.users.findIndex(user => user.username === username)
}

const addUser = (user) => {
  const newUser = {
    username: user.username,
    password: user.password,
    id: generateId()
  }
  console.log(newUser)
  console.log("käyttäjät", userdb.users)
  
  userdb.users.push(newUser)
}

const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

const userPost = (req, res) => {
  const {username, password} = req.body
  if (findUser(username) >= 0 ){
    const status = 400
    const message = 'Käyttäjätunnus varattu'
    res.status(status).json({status, message})
    return
  }
  const user = req.body
  addUser(user)
  const status = 200
  const message = `Lisätään ${user.username}`
  res.status(200).json({status, message})
}

const userUse = (req, res, next) => {
  next()
}

module.exports = { userPost, userUse }