/////////////DEPENDENCIES////////////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

/////////////////INITUALIZE//////////////////////////////////
const app = express();
const Schema = mongoose.Schema;

///////////////////CONFIG////////////////////////////////////
require('dotenv').config();
const { PORT = 4003, DATABASE_URL } = process.env;

//////////////CONNECT MONGODB////////////////////////////////
mongoose.connect(DATABASE_URL);
mongoose.connection
.on('connected', () => console.log('MONGODB  IS CONNECTED'))


/////////// BARBER SHOP SCHEMA MODELS ////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
//SCHEMA MODEL
const peopleSchema = new mongoose.Schema({
    name: String,
    title: String,
    createdAt: String,
}, {timestamps: true}); //APROX
    //Model
    const People = mongoose.model('People', peopleSchema); 

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


/////////// SAMP SCHEMA MODELS///////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

//MODELS
const workoutSchema = new mongoose.Schema({ 
    name: String,
    date: String,
    time: String,
    description: String,
    }, { timestamps: true });
    
    const Workout = mongoose.model( 'Workout', workoutSchema); 


//////////////////////////////////////////////////////////////
///////////// DIGITAL INVESTORS HUB //////////////////////////
//////////////////////////////////////////////////////////////
//REVIEWS/////////////////////////////////////////////////////
const reviewsSchema = new mongoose.Schema({
    message: { type: String },
    rating: {type: Number, min: 1, max: 5, default: 5}
}, { timestamps: true });
const Reviews = mongoose.model('Reviews', reviewsSchema);

//COMMENT
const commentSchema = new Schema({
    message: { type: String }
    
}, { timestamps: true });

//BLOG////
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    comment: [commentSchema],
    counter: { type: Number, default: 0 },
}, { timestamps: true });
const Blog = mongoose.model('Blog', blogSchema);

//PLUS////
const plusSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    time: { type: String },
    date: { type: String },
}, { timestamps: true });
const Plus = mongoose.model('Plus', plusSchema);

////////////////////////USER////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
const userSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    image: { type: String },
bio: String,
posts: {type:Schema.Types.ObjectId, ref: 'Post'}
}, { timestamps: true });
module.exports = mongoose .model('User', userSchema)

//ESSENTIALP////
const essentialPSchema = new mongoose.Schema({
    name: { type: String },
    image: { type: String },
    time: { type: String },
    date: { type: String },
}, { timestamps: true });
const EssentialP = mongoose.model('EssentialP', essentialPSchema);

//WEBSITE/
const websiteSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    comment: [commentSchema],
    counter: { type: Number, default: 0 },
}, { timestamps: true });
const Website = mongoose.model('Website', websiteSchema);

//POST/////
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String,
    comment: [commentSchema],
    counter: { type: Number, default: 0 },
}, { timestamps: true });
const Post = mongoose.model('Post', postSchema);


/////////////MIDDLEWARE//////////////////////////////////////////////
app.use(express.json()); 
app.use(cors()); //all domains can request data without being blocked
app.use(logger('dev'));



////////////////ROUTES
app.get('/', (req, res) => {
    res.send('WELCOME TO THE DIGITAL INVESTORS HUB');
});


//////////////////////////////////////////////////////////////
///////////// BARBER SHOP ///////////////////////////////////
//////////////////////////////////////////////////////////////

/////////////////////
///////////////PEOPLE
/////////////////////
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
app.delete('/api/people/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await People.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});


//////////////////////////////////////////////////////////////
///////////// SAMP FITNESS ///////////////////////////////////
//////////////////////////////////////////////////////////////
////////////////INDEX
//WORKOUT
app.get('/api/workout', async (req, res) => {
    try {
        res.status(200).json(await Workout.find({})); 
    } catch (error) {
        res.status(400).json({'error': 'bad request'});
    }
});

///////CREATE
//CREATE WORKOUT
app.post('/api/workout', async (req, res) => {
    try {
        res.status(201).json(await Workout.create(req.body));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});

//WORKOUT UPDATE
app.put('/api/workout/:id', async(res, req) => {
    try {
        res.status(200).json(await Workout.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ))
    } catch (error) {
    }
});


//WORKOUT DELETE
app.delete('/api/workout/delete/:id', async(req, res) =>{
    try {
        res.status(200).json(await Workout.findByIdAndDelete(
            req.params.id
            ));
        } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});



//////////////////////////////////////////////////////////////
///////////// USER ///////////////////////////////////////////
//////////////////////////////////////////////////////////////
///////////////////
///////////////INDEX
///////////////////
app.get('/api/user', async (req, res) => {
    try {
      res.status(200).json(await User.find({}));
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'bad request',
      });
    }
  });
/////////////////////
///////////////CREATE
/////////////////////
app.post('/api/user', async (req, res) => {
    try {
      res.status(201).json(await User.create(req.body));
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'bad request' });
    }
  });
/////////////////////
///////////////UPDATE
/////////////////////
app.put('/api/user/:id', async (req, res) => {
    try {
      res.status(200).json(
        await Post.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: 'bad request',
      });
    }
  });  
/////////////////////
///////////////DELETE
/////////////////////
app.delete('/api/user/delete/:id', async (req, res) => {
    try {
      res.status(200).json(await User.findByIdAndDelete(req.params.id));
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'bad request' });
    }
  });
  



//////////////////////////////////////////////////////////////
///////////// DIGITAL INVESTORS HUB //////////////////////////
//////////////////////////////////////////////////////////////
///////////////////
///////////////POST
///////////////////
app.get('/api/post', async(req, res) => {
    try {
        res.status(200).json(await Post.find({}));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
        
    }
});
//CREATE//
app.post('/api/post', async(req, res) => {
    try {
        res.status(201).json(await Post.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/post/:id', async(req, res) => {
    try {
        res.status(200).json(await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//DELETE//
app.delete('/api/post/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await Post.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});


//////////////////////
///////////////WEBSITE
//////////////////////
app.get('/api/websites', async(req, res) => {
    try {
        res.status(200).json(await Website.find({}));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});
//CREATE//
app.post('/api/websites', async(req, res) => {
    try {
        res.status(201).json(await Website.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});
//UPDATE//
app.put('/api/websites/:id', async(req, res) => {
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
    app.delete('/api/websites/delete/:id', async(req, res) => {
        try {
            res.status(200).json(await Feed.findByIdAndDelete(
                req.params.id));
            } catch (error) {
            res.status(400).json({ 'error': 'Bad Request' });
        }
    });
/////////////////
/////////////PLUS
/////////////////
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
app.delete('/api/plus/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await Plus.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});
/////////////////
/////////////BLOG
/////////////////
app.get('/api/blogs', async(req, res) => {
    try {
        res.status(200).json(await Blog.find({}));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});
//CREATE//
app.post('/api/blogs', async(req, res) => {
    try {
        res.status(201).json(await Blog.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/blogs/:id', async(req, res) => {
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
    app.delete('/api/blogs/delete/:id', async(req, res) => {
        try {
            res.status(200).json(await Blog.findByIdAndDelete(
                req.params.id));
            } catch (error) {
            res.status(400).json({ 'error': 'Bad Request' });
        }
    });
    
///////////////////////
/////////////ESSENTIALP
///////////////////////
app.get('/api/essentials', async(req, res) => {
    try {
        res.status(200).json(await EssentialP.find({}));
    } catch (error) {
        res.status(400).json({'error': 'Bad Request'});
    }
});
//CREATE//
app.post('/api/essentials', async(req, res) => {
    try {
        res.status(201).json(await EssentialP.create(req.body));
    } catch (error) {
        res.status(400).json({'404 Message': 'Bad Request'});
    }
});

//UPDATE//
app.put('/api/essentials/:id', async(req, res) => {
    try {
        res.status(200).json(await EssentialP.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
            ));
        } catch (error) {
            res.status(400).json({'404 Message': 'Bad Request'});
        }
    });
    
    //DELETE//
    app.delete('/api/essentials/delete/:id', async(req, res) => {
        try {
            res.status(200).json(await EssentialP.findByIdAndDelete(
                req.params.id));
            } catch (error) {
            res.status(400).json({ 'error': 'Bad Request' });
        }
    });
    
//////////////////
///////////REVIEWS
//////////////////
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
app.delete('/api/reviews/delete/:id', async(req, res) => {
    try {
        res.status(200).json(await Reviews.findByIdAndDelete(
            req.params.id));
    } catch (error) {
        res.status(400).json({ 'error': 'Bad Request' });
    }
});





//////////////////////////////////////////////
/////////////////////LISTEN///////////////////
//////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`PORT IS LISTENING ON PORT ${ PORT }`);
});