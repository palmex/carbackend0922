const express = require('express')
const path = require('path')
const testRouter = require('./routes/test')
const carsRouter = require('./routes/cars')

var request = require('supertest');
const assert = require('assert');
// install mocha globally
var expect = require('chai').expect;

const app = express()
const port = 3000

app.use('/test', testRouter)
app.use('/cars', carsRouter)
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)

app.get('/', (request, response) => {
    // console.log(request)
    response.json(
        {
            welcome: "Hello Class of Stellantis-OU Module 323423432!"
        }
    )
})

app.get('/html', (request, response) => {
    // console.log(request)
    response.sendFile(
        path.join(__dirname, '/index.html')
    )
})


app.listen(port, () => {
    console.log(`Listening on port localhost:${port}!`)
})


// UNIT TESTING



// mocha
describe('Our server', function() {

    //   mocha
        it('should send back a JSON object at path "/" with welcome message', function(done) {
            // supertest
          request(app)
            .get('/')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
              if (err) { return done(err); }
              callStatus = res.body.welcome;
            //   expect = chai
              expect(callStatus).to.not.equal('');
              // Done
              done();
            });
        });

        it('should send back a JSON object at path "/cars/all" with car_id NOT NULL', function(done) {
            // supertest
          request(app)
            .get('/cars/all')
            .set('Content-Type', 'application/json')
            .set('admin', 'true')
            .expect('Content-Type', /json/)
            .expect(200, function(err, res) {
              if (err) { return done(err); }
              callStatus = res.body;
            //   expect = chai
              console.log(callStatus)
              expect(callStatus).to.not.equal(null);
              // Done
              done();
            });
        });
      });