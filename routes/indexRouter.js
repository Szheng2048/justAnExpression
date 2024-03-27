const express = require('express')
//allows the extension express
const router = express.Router()
// sets a constant that can be modified and used as paths for the user


router.get('/',(req,res)=>{
    res.end("Welcome to my App")
})
//a get request that states the user has initialized the app

module.exports = router
//allows the app.js to access this router