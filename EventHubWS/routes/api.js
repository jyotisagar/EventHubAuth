const express = require('express')
const router  = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}
router.get('/',(req,res)=>{
    res.send('Response from API route')
})

router.post('/register',(req,res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error,registeredUser) => {
        if(error){
            console.log('Error - register api:', error)
        }
        else{
            var payload = {subject: registeredUser._id }
            var token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })

})

router.post('/login', (req,res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log('Error - login api:', error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid email!')
            }
            else{
                if(user.password != userData.password){
                    res.status(401).send('Invalid password')
                }
                else{
                    var payload = { subject: user._id }
                    var token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/events', (req,res) => {
    let events = [
        {
            'id': 1,
            'name': 'Auto Expo1',
            'description': 'This is Auto Expo1'            
        },
        {
            'id': 2,
            'name': 'Auto Expo2',
            'description': 'This is Auto Expo2'            
        },
        {
            'id': 3,
            'name': 'Auto Expo3',
            'description': 'This is Auto Expo3'            
        },
        {
            'id': 4,
            'name': 'Auto Expo4',
            'description': 'This is Auto Expo4'            
        },
        {
            'id': 5,
            'name': 'Auto Expo5',
            'description': 'This is Auto Expo5'            
        }
    ]
    res.json(events)
})

router.get('/specialEvents', verifyToken, (req,res) => {
    let events = [
        {
            'id': 1,
            'name': 'Special Auto Expo1',
            'description': 'Special - This is Auto Expo1'            
        },
        {
            'id': 2,
            'name': 'Special Auto Expo2',
            'description': 'Special - This is Auto Expo2'            
        },
        {
            'id': 3,
            'name': 'Special Auto Expo3',
            'description': 'Special - This is Auto Expo3'            
        },
        {
            'id': 4,
            'name': 'Special Auto Expo4',
            'description': 'Special - This is Auto Expo4'            
        },
        {
            'id': 5,
            'name': 'Special Auto Expo1',
            'description': 'Special - This is Auto Expo1'            
        }
    ]
    res.json(events)
})

module.exports = router
