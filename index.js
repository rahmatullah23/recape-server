const express = require('express')

const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const port = 3020

const app = express()

app.use(cors());
app.use(bodyParser.json())

const uri = "mongodb+srv://prouser:pro123@cluster0.yad50.mongodb.net/protest?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("protest").collection("goodprotest");

  console.log('db connection');
  
 app.post('/addBooking', (req,res) => {
     const newBooking = req.body;
    //  console.log(newBooking)
     collection.insertOne(newBooking)
     .then((result) =>{
       res.send(result.insertedCount > 0)
            // console.log(res)
     })
     })
     
app.get('/bookings', (req,res) => {
  // console.log(req.query.email)
  collection.find({email: req.query.email})
  .toArray((err, documents) =>{
res.send(documents)
  })
})


});



app.get('/', (req, res) => {
  res.send('Hello recap server')
})

app.listen(port)