const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Post Model
const Post = require("../../models/Post");

//Load Profile Model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require('./../../validation/post');



//@route GET api/posts/test
//@desc Tests post route
//@access Public
router.get('/test', (req,res,next)=>{
    res.json({
        msg: 'posts works'
    });

    next();
});



//@route GET api/posts/
//@desc Get posts
//@access public
router.get('/', (req,res)=>{
    Post.find()
        .sort({data:-1})
        .then(posts => res.json(posts))
        .catch(err=> res.status(404).json({nopostsfound: "No posts found"}));
})


//@route GET api/posts/:id
//@desc Get get by id
//@access public
router.get('/:id', (req,res)=>{
    Post.findById(req.params.id)
        .sort({data:-1})
        .then(post => res.json(post))
        .catch(err=> res.status(404).json({nopostfound: "No post found with that id"}));
})



//@route POST api/posts/
//@desc Create Post
//@access private

router.post("/", passport.authenticate('jwt',{session:false}), (req,res)=>{

    const {errors,isValid} = validatePostInput(req.body);

    //Check Validation
        if(!isValid){
            //If any errors, send 400 with errors object
            return res.status(400).json(errors);
        }


    const newPost = new Post({
        text : req.body.text,
        name: req.body.name,
        avatar: req.body.name,
        user : req.user.id
    });

    newPost.save().then(post => res.json(post));

})



//@route POST api/posts/like/:id
//@desc Like post
//@access private

router.post("/like/:id", passport.authenticate('jwt', {session:false}), (req,res)=>{

    Profile.findOne({user: req.user.id})
        .then(profile =>{
            Post.findById(req.params.id)
                .then(post =>{
                        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                                return res.status(400).json({alreadyliked : "user already liked this post"});
                        }
                        else{

                            //Add user id to likes array
                            post.likes.unshift({ user: req.user.id});

                            post.save().then(post => res.json(post))
                        }
                })
                .catch(err=> res.status((404).json({postnotfound : "No post found"})));
        });
})



//@route POST api/posts/unlike/:id
//@desc UnLike post
//@access private

router.post("/unlike/:id", passport.authenticate('jwt', {session:false}), (req,res)=>{

    Profile.findOne({user: req.user.id})
        .then(profile =>{
            Post.findById(req.params.id)
                .then(post =>{
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({notliked : "you have not yet liked this post"});
                    }
                    else{

                        //Get remove index

                        const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id);

                        //Splice out of
                        post.likes.splice(removeIndex,1);

                        //Save
                        post.save().then(post => res.json(post));

                    }
                })
                .catch(err=> res.status((404).json({postnotfound : "No post found"})));
        });
})



//@route DELETE api/posts/:id
//@desc DELETE post
//@access private

router.delete("/:id", passport.authenticate('jwt', {session:false}), (req,res)=>{

    Profile.findOne({user: req.user.id})
        .then(profile =>{
            Post.findById(req.params.id)
                .then(post =>{
                    //Check for post owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({notauthorized : "user not authorized"});
                    }

                    //Delete
                    post.remove().then(()=> res.json({success : true}));
                })
                .catch(err=> res.status((404).json({postnotfound : "No post found"})));
        });
})


module.exports = router;