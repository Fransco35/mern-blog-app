const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const cloudinary = require('cloudinary').v2
const multer = require('multer')
const path = require('node:path')


const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

//Database Connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Mongodb is connected"))
.catch((error) => console.log(error))

//cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

  //multer config
  const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname            )
        if(ext !== '.png' && ext !== '.jpeg' && ext !== '.jpg') {
            cb(new Error('File is not supported'), false);
            return;
        }
        cb(null, true)
    }
  })


//Defined article schema
const articleSchema = new mongoose.Schema({
    title: String,
    time: String,
    image: String,
    description: String,
    cloudinary_id : String
})

const Article = mongoose.model("Article", articleSchema)

app.get('/api/articles', async (req, res) => {
    try{
        const articles = await Article.find();
        res.status(200).json(articles)
    } catch(error) {
        res.send(error.message)
    }
})

app.post('/api/articles', upload.single('image'), async (req, res) => {
    const {title, time, description } = req.body

    try{
       const image = await cloudinary.uploader.upload(req.file.path)

       const article = new Article({
        title: title,
        time: time,
        image: image.secure_url,
        description: description,
        cloudinary_id: image.public_id

    })

    await article.save();
    res.status(201).json({message: "article created successfully"})
    } catch(error) {
        res.send(error.message)
    }
})


app.delete('/api/:id', async (req, res) => {
    const requestedTaskId = req.params.id
    try {
        const article = await Article.findById(requestedTaskId)
        await cloudinary.uploader.destroy(article.cloudinary_id)
        await article.deleteOne();
        res.json(article)
    } catch(error) {
        res.send(error.message)
    }
})

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server has started on port ${port}`)
})