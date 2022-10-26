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
//BLOG//
const blogSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    time: { type: String },
    date: { type: String },
}, { timestamps: true });
const Blog = mongoose.model('Blog', blogSchema);

//PACKAGE//
const packageSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    time: { type: String },
    date: { type: String },
}, { timestamps: true });
const Package = mongoose.model('Package', packageSchema);

//SPORTS//
const sportSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    time: { type: String },
    date: { type: String },
}, { timestamps: true });
const Sport = mongoose.model('Sport', sportSchema);

//WEBSITE//
const websiteSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    time: { type: String },
    date: { type: String },
}, { timestamps: true });
const Website = mongoose.model('Website', websiteSchema);

/////////////MIDDLEWARE//////////////////////////////////////////////
app.use(express.json()); 
app.use(cors()); //all domains can request data without being blocked
app.use(logger('dev'));

////////////////ROUTES//////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('WELCOME TO THE DIGITAL INVESTORS HUB');
});

///////////////FEED/////////////////////////////////////////////////////
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

///////////////WEBSITE//////////////////////////////////////////////////
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
    
    /////////////PACKAGE//////////////////////////////////////////////////
    app.get('/api/package', async(req, res) => {
        try {
            res.status(200).json(await Package.find({}));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/package/:id', async(req, res) => {
    try {
        res.status(200).json(await Package.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
        }
    });
    
    //CREATE//
    app.post('/api/package', async(req, res) => {
        try {
            res.status(201).json(await Package.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});
//DELETE//
app.delete('/api/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await Package.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});

/////////////BLOG////////////////////////////////////////////////////
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
    
    ///////////SPORT////////////////////////////////////////////////////
    app.get('/api/sport', async(req, res) => {
        try {
            res.status(200).json(await Sport.find({}));
        } catch (error) {
            res.status(400).json({'error': 'Bad Request'});
        }
    });
    //CREATE//
    app.post('/api/sport', async(req, res) => {
        try {
            res.status(201).json(await Sport.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/sport/:id', async(req, res) => {
    try {
        res.status(200).json(await Sport.findByIdAndUpdate(
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
        res.status(200).json(await Sport.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});

/////////////////////LISTEN//////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`PORT IS LISTENING ON PORT ${ PORT }`);
});