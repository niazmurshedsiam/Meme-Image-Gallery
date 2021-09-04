const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectId;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.json())
console.log(process.env.DB_USER);
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bm8mo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const imageCollection = client.db("memeTaskWork").collection("items");
  
  app.post('/addImage',(req,res)=>{
    const newEvent = req.body;
    console.log('Adding New Event: ', newEvent);
    imageCollection.insertOne(newEvent)
    
  })
  app.get('/images',(req,res)=>{
    imageCollection.find()
    .toArray((err,items)=>{
      res.send(items);
      // console.log('From Database',items);
    })
  })

  app.delete('deleteEvent/:id',(req,res)=>{
    const id = ObjectID(req.params.id);
    console.log('delete this',id);
    imageCollection.findOneAndDelete({_id: id})
    .then(documents => res.send(documents.value));

  })
  
  console.log('DataBase connected');
  
//   client.close();
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})