const express = require('express')
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb')
const { clusterPassword } = require('./config')
    //const multer = require('multer');
    //const upload = multer({ dest: 'uploads/' }).single("demo_image")

const app = express()

app.set('view engine', 'pug')
app.set('views', "./views")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())
    //app.use(multer)(upload)

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
            //console.log(req.body)
            muralCollection.insertOne(req.body).then(result => {
                //console.log(result)
                res.redirect("/")
            }).catch(error => console.log(error))
        })
        // perform actions on the collection object
    app.put('/murals', (req, res) => {
        console.log(req.body)
        muralCollection.findOneAndUpdate({ muralTitle: "this is a new entry" }, {
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
    app.delete('/murals', (req, res) => {
        console.log(req.body)
        muralCollection.deleteOne({ muralTitle: req.body.muralTitle }, ).then(res => {
            console.log("Title Deleted!")
        }).catch(error => console.log(error))
    })
    app.listen(3000, () => console.log('Server is Serving'))
});