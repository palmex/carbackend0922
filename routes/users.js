const express = require('express')


var usersRouter = express.Router()

const db = require('../db')
usersRouter.use(express.json())

// GET ALL USERS
usersRouter.get('/all', (req,res) =>{
    // console.log('admin header:', req.headers.admin)
    if (req.headers.admin){
        queryStatement = 'SELECT * FROM users;'
        var result = ""
        dbQuery(queryStatement, req,res)   
    }
    else {
        res.status(401).json({"Unsuccessful":"You are not authorizeed to access this endoint"})
        console.log("Not authorized")
    }
})

// CREATE NEW USER 
    usersRouter.post('/new', (req,res) =>{
    console.log(req.body)
    var name =  req.body.name
    var email =  req.body.email
    var phone =  req.body.phone
    queryStatement = `INSERT INTO users (name, email, phone)
     VALUES ('${name}',' ${email}', ${phone}) RETURNING *;`
    console.log(queryStatement)
    // var result = ""
    dbQuery(queryStatement, req,res)   
})

// Get only one user from DB with id = '' -- USING PARAMETER FOR THE FIRST TIME
    usersRouter.get('/', (req,res) =>{
    console.log('user id:', req.params.userId)
    console.log('request query', req.query.userId)
    queryStatement = `SELECT * FROM users WHERE user_id = '${req.query.userId}';`
    console.log(queryStatement)
    // // var result = ""
    dbQuery(queryStatement, req,res)   
    // res.status(200).json({"success":"get user id "+ req.params.userId})
})

// DELETE USER WITH USER_ID
usersRouter.delete('/:userId', (req,res) =>{
    console.log('users id:', req.params.userId)
    queryStatement = `DELETE FROM users WHERE user_id = '${req.params.userId}';`
    console.log(queryStatement)
    // // var result = ""
    dbQuery(queryStatement, req,res)   
    // res.status(200).json({"success":"get user id "+ req.params.userId})
})

// UPDATE USER WITH USER_ID
usersRouter.put('/:userId', (req,res) =>{
    console.log('user id:', req.params.userId)
    var name =  req.body.name
    var email =  req.body.email
    var phone =  req.body.phone
    queryStatement = `UPDATE users SET name='${name}', email='${email}', phone=${phone} WHERE user_id = '${req.params.userId}' RETURNING *;`
    console.log(queryStatement)
    // // var result = ""
    dbQuery(queryStatement, req,res)   
    // res.status(200).json({"success":"get user id "+ req.params.userId})
})

const dbQuery = (queryStatement, request, response ) => {

    db.query(queryStatement, (error, results) => {
        if (error) {
            response.status(500).json(error)
        }
        // console.log(results)
        result = results.rows
        response.status(200).json(result)
    })

}

module.exports = usersRouter;