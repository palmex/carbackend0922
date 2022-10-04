const express = require('express')
var testRouter = express.Router()

// import our DB index.js file
const db = require('../db')

testRouter.use(express.json())

testRouter.get('/', (req,res) =>{
    res.json({
        "test": "route endpoint 1"
    })
})

testRouter.get('/async', (req,res) =>{
    queryStatement = 'SELECT * FROM cars;'
    var result = ""
    console.log("before query")
    db.query(queryStatement, (error, results) => {
        if (error) {
            res.status(500).json(error)
        }
        result = results.rows
        console.log("inside query")
        console.log(result)
        res.status(200).json(result)
    })
    console.log("after query")
})

testRouter.post('/', (req,res) =>{
    console.log(req.body)
    res.status(200).json(req.body)
})



module.exports = testRouter; 


