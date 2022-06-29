const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const fetch = require('node-fetch')
const config = require('./config')
const { response } = require('express')
const app = express()

app.set('view engine', 'pug')
app.set('views', "./views")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/styles', express.static('styles'))
app.use('/images', express.static('public'))
app.use(express.static('public'))

const uri = `mongodb+srv://${config.clusterPassword}@cluster0.fxgx6.mongodb.net/?retryWrites=true&w=majority`;

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
            console.log(results)
            res.render('index', { images: results })
        })
    })
    app.post("/murals", (req, res) => {
        const document = {...req.body, likes: 0, dislikes: 0 }
        muralCollection.insertOne(document).then(result => {
            res.redirect("/")
        }).catch(error => console.log(error))
    })

    // perform actions on the collection object

    app.put("/like/:postId", (req, res) => {
        // console.log("!!!!!!!!!!!!!", req.params.postId)
        let objectId = new ObjectId(req.params.postId)
        muralCollection.findOneAndUpdate({ _id: objectId }, {
            $inc: {
                likes: 1,
            }
        }, {
            upsert: true
        }).then(result => {
            //console.log(result)
            res.json('Success')
        }).catch(error => console.log(error))
    })
    app.put("/dislike/:postId", (req, res) => {
        let objectId = new ObjectId(req.params.postId)
        muralCollection.findOneAndUpdate({ _id: objectId }, {
            $inc: {
                dislikes: 1
            }
        }, {
            upsert: true
        }).then(result => {
            //console.log(result)
            res.json('Success')
        }).catch(error => console.log(error))
    })
    app.put('/murals', (req, res) => {
        muralCollection.findOneAndUpdate({ muralTitle: ` ${req.body.muralTitle}` }, {
            $set: {
                id: req.body._id,
                muralTitle: req.body.muralTitle,
                image: req.body.image,
                likes: req.body.like,
                dislikes: req.body.dislike
            }
        }, {
            upsert: true
        }).then(result => {
            //console.log(result)
            res.json('Success')
        }).catch(error => console.log(error))
    })
    app.listen((config.port), () => console.log('Server is Serving'))
});