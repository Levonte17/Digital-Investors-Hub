/////////////DEPENDENCIES/////////////////////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

/////////////////INITUALIZE//////////////////////////////////////////////
const app = express();

///////////////////CONFIG//////////////////////////////////////////////////
require('dotenv').config();
const { PORT = 4000, DATABASE_URL } = process.env;

//////////////CONNECT MONGODB/////////////////////////////////////////
mongoose.connect(DATABASE_URL);
mongoose.connection
.on('connected', () => console.log('MONGODB  IS CONNECTED'))

///////////SCHEMA MODELS//////////////////////////////////////////////////
//BLOG//////////////////////////////////////////////////////////
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    reviews: [reviewsSchema],
    counter: { type: Number, default: 0 },
}, { timestamps: true });
const Blog = mongoose.model('Blog', blogSchema);

//PEOPLE////////////////////////////////////////////////////////
const peopleSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String,
        default: 'https://i.imgur.com/7jET8VB.png'
    },
    business: { type: String },
    createdAt: { type: String}, 
}, { timestamps: true });
const People = mongoose.model('People', peopleSchema);

//PLUS//////////////////////////////////////////////////////////
const plusSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    time: { type: String },
    date: { type: String },
}, { timestamps: true });
const Plus = mongoose.model('Plus', plusSchema);

//REVIEWS//////////////////////////////////////////////////////
const reviewsSchema = new mongoose.Schema({
    message: { type: String },
    rating: {type: Number, min: 1, max: 5, default: 5}
}, { timestamps: true });
const Reviews = mongoose.model('Reviews', reviewsSchema);

//WEBSITE///////////////////////////////////////////////////////
const websiteSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    reviews: [reviewsSchema],
    counter: { type: Number, default: 0 },
}, { timestamps: true });
const Website = mongoose.model('Website', websiteSchema);

//FEED///////////////////////////////////////////////////////////
const feedSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    reviews: [reviewsSchema],
    counter: { type: Number, default: 0 },
}, { timestamps: true });
const Feed = mongoose.model('Feed', feedSchema);

//ALL//////////////////////////////////////////////////////////////
const allSchema = new Schema({
    createPost: { type: String },
}, { timestamps: true });
const All = mongoose.model('All', allSchema);


/////////////MIDDLEWARE//////////////////////////////////////////////
app.use(express.json()); 
app.use(cors()); //all domains can request data without being blocked
app.use(logger('dev'));



////////////////ROUTES//////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('WELCOME TO THE DIGITAL INVESTORS HUB');
});
//////////////////////////////////////////////
///////////////FEED/////////////////////////////////////////////////////
//////////////////////////////////////////////
app.get('/api/feed', async(req, res) => {
    try {
        res.status(200).json(await Feed.find({}));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
        
    }
});
//CREATE//
app.post('/api/feed', async(req, res) => {
    try {
        res.status(201).json(await Feed.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/feed/:id', async(req, res) => {
    try {
        res.status(200).json(await Feed.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//DELETE//
app.delete('/api/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await Feed.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});
//////////////////////////////////////////////
///////////////ALL/////////////////////////////////////////////////////
//////////////////////////////////////////////
//INDEX
app.get('/api/all', isAuthenticated, async (req, res) => {
    try {
        res.status(200).json(await People.find({ createdByUserId: req.user.uid}));
    } catch (error) {
        res.status(400).json({'error': 'bad request'});

    }
});

//CREATE
app.post('/api/people', isAuthenticated, async (req,res) => {
try {
    req.body.createdByUserId = req.user.uid
    res.status(201).json(await People.create(req.body))
} catch (error) {
    res.status(400).json({'error': '404 message: bad request'});
}
});

//UPDATE
app.put('/api/people/:id', async ( req, res) => {
try{
    res.status(200).json(await People.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    ));
} catch (error) {
res.status(400).json({'error': '404 message: bad request'});
}
});

//DELETE
app.delete('api/people/:id', async (req, res) => {
    try{
        res.status(200).json(await People.findByIdAndDelete(
            req.params.id
    ));
 } catch (error) {
        res.status(400).json({'error': '404 message: bad request'});
    }
});

//////////////////////////////////////////////
///////////////PEOPLE/////////////////////////////////////////////////////
//////////////////////////////////////////////
app.get('/api/people', async(req, res) => {
    try {
        res.status(200).json(await People.find({}));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
        
    }
});
//CREATE//
app.post('/api/people', async(req, res) => {
    try {
        res.status(201).json(await People.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/people/:id', async(req, res) => {
    try {
        res.status(200).json(await People.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//DELETE//
app.delete('/api/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await People.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});
//////////////////////////////////////////////
///////////////WEBSITE//////////////////////////////////////////////////
//////////////////////////////////////////////
app.get('/api/website', async(req, res) => {
    try {
        res.status(200).json(await Website.find({}));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});
//CREATE//
app.post('/api/website', async(req, res) => {
    try {
        res.status(201).json(await Website.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});
//UPDATE//
app.put('/api/website/:id', async(req, res) => {
    try {
        res.status(200).json(await Website.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
        }
    });
    
    //DELETE//
    app.delete('/api/delete/:id', async(req, res) => {
        try {
            res.status(200).json(await Feed.findByIdAndDelete(
                req.params.id));
            } catch (error) {
            res.status(400).json({ 'error': 'Bad Request' });
        }
    });
//////////////////////////////////////////////
/////////////PLUS//////////////////////////////////////////////////
//////////////////////////////////////////////
    app.get('/api/plus', async(req, res) => {
        try {
            res.status(200).json(await Plus.find({}));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/plus/:id', async(req, res) => {
    try {
        res.status(200).json(await Plus.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
        }
    });
    
    //CREATE//
    app.post('/api/plus', async(req, res) => {
        try {
            res.status(201).json(await Plus.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});
//DELETE//
app.delete('/api/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await Plus.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});
//////////////////////////////////////////////
/////////////BLOG////////////////////////////////////////////////////
//////////////////////////////////////////////
app.get('/api/blog', async(req, res) => {
    try {
        res.status(200).json(await Blog.find({}));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});
//CREATE//
app.post('/api/blog', async(req, res) => {
    try {
        res.status(201).json(await Blog.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/blog/:id', async(req, res) => {
    try {
        res.status(200).json(await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
        }
    });
    
    //DELETE//
    app.delete('/api/delete/:id', async(req, res) => {
        try {
            res.status(200).json(await Blog.findByIdAndDelete(
                req.params.id));
            } catch (error) {
            res.status(400).json({ 'error': 'Bad Request' });
        }
    });
    
//////////////////////////////////////////////
///////////REVIEWS////////////////////////////////////////////////////
//////////////////////////////////////////////
    app.get('/api/reviews', async(req, res) => {
        try {
            res.status(200).json(await Reviews.find({}));
        } catch (error) {
            res.status(400).json({'error': 'Bad Request'});
        }
    });
    //CREATE//
    app.post('/api/reviews', async(req, res) => {
        try {
            res.status(201).json(await Reviews.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/reviews/:id', async(req, res) => {
    try {
        res.status(200).json(await Reviews.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//DELETE//
app.delete('/api/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await Reviews.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});

//////////////////////////////////////////////
/////////////////////LISTEN//////////////////////////////////////////////////
//////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`PORT IS LISTENING ON PORT ${ PORT }`);
});