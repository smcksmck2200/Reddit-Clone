const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb')
const fetch = require('node-fetch')
const { clusterPassword } = require('./config')


const app = express()

app.set('view engine', 'pug')
app.set('views', "./views")

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/styles', express.static('styles'))
app.use('/images', express.static('public'))
app.use(express.static('public'))
app.use(bodyParser.json())


const uri = `mongodb+srv://${clusterPassword}@cluster0.fxgx6.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to MongoDB")
    }
    const db = client.db("Murals")
    const muralCollection = db.collection("images");

    app.get("/", (req, res) => {
        muralCollection.find().toArray().then(results => {
            //console.log(results)
            res.render('index', { images: results })
        })
    })
    app.post("/murals", (req, res) => {
        console.log(req.body)
        muralCollection.insertOne(req.body).then(result => {
            console.log(result)
            res.redirect("/")
        }).catch(error => console.log(error))

    })

    // perform actions on the collection object
    app.put('/murals', (req, res) => {
        console.log(req.body)
        muralCollection.findOneAndUpdate({ muralTitle: `test ${req.body.muralTitle}` }, {
            $set: {
                muralTitle: req.body.muralTitle,
                image: req.body.image
            }
        }, {
            upsert: true
        }).then(result => {
            console.log(result)
            res.json('Success')
        }).catch(error => console.log(error))
    })
    app.post("/index2", (req, res) => {
        console.log(req.body)
        muralCollection.insertOne(req.body).then(result => {
            console.log(result)
            res.redirect("/")
        }).catch(error => console.log(error))
        res.render('index2')
    })

    app.listen(3000, () => console.log('Server is Serving'))
});