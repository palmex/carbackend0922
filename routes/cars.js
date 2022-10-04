const express = require('express')
var carsRouter = express.Router()

const db = require('../db')
carsRouter.use(express.json())

// GET ALL CARS
carsRouter.get('/all', (req,res) =>{
    console.log('admin header:', req.headers.admin)
    if (req.headers.admin){
        queryStatement = 'SELECT * FROM cars;'
        var result = ""
        dbQuery(queryStatement, req,res)   
    }
    else {
        res.status(401).json({"Unsuccessful":"You are not authorizeed to access this endoint"})
        console.log("Not authorized")
    }
})

// CREATE NEW CAR 
carsRouter.post('/new', (req,res) =>{
    console.log(req.body)
    var make =  req.body.make
    var model =  req.body.model
    var year =  req.body.year
    var odometer =  req.body.odometer
    queryStatement = `INSERT INTO cars (make, model, year, odometer)
     VALUES ('${make}',' ${model}', ${year}, ${odometer}) RETURNING *;`
    console.log(queryStatement)
    // var result = ""
    dbQuery(queryStatement, req,res)   
})

// Get only one car from DB with id = '' -- USING PARAMETER FOR THE FIRST TIME
carsRouter.get('/:carId', (req,res) =>{
    console.log('car id:', req.params.carId)
    queryStatement = `SELECT * FROM cars WHERE car_id = '${req.params.carId}';`
    console.log(queryStatement)
    // // var result = ""
    dbQuery(queryStatement, req,res)   
    // res.status(200).json({"success":"get car id "+ req.params.carId})
})


// DELETE CAR WITH CAR_ID
carsRouter.delete('/:carId', (req,res) =>{
    console.log('car id:', req.params.carId)
    queryStatement = `DELETE FROM cars WHERE car_id = '${req.params.carId}';`
    console.log(queryStatement)
    // // var result = ""
    dbQuery(queryStatement, req,res)   
    // res.status(200).json({"success":"get car id "+ req.params.carId})
})

carsRouter.put('/:carId', (req,res) =>{
    console.log('car id:', req.params.carId)
    var make =  req.body.make
    var model =  req.body.model
    var year =  req.body.year
    var odometer =  req.body.odometer
    queryStatement = `UPDATE cars SET make='${make}', model='${model}', year=${year}, odometer=${odometer} WHERE car_id = '${req.params.carId}' RETURNING *;`
    console.log(queryStatement)
    // // var result = ""
    dbQuery(queryStatement, req,res)   
    // res.status(200).json({"success":"get car id "+ req.params.carId})
})


const dbQuery = (queryStatement, request, response ) => {

    db.query(queryStatement, (error, results) => {
        if (error) {
            response.status(500).json(error)
        }
        console.log(results)
        result = results.rows
        response.status(200).json(result)
    })

}

module.exports = carsRouter; 