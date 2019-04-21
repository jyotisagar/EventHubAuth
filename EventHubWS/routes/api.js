const express = require('express')
const router  = express.Router()
const User = require('../models/user')

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
            res.status(200).send(registeredUser)
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
                    res.status(200).send(user)
                }
            }
        }
    })
})

router.get('/events',(req,res) => {
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

router.get('/special',(req,res) => {
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
