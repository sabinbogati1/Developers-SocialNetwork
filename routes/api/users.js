const express = require("express");
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');//For password hashing
const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');

//Load User model
const User = require("./../../models/User");

//@route GET api/user/test
//@desc Tests user route
//@access Public
router.get('/test', (req,res)=>{
    res.json({
        msg: 'Users works'
    })
});



//@route POST api/users/register
//@desc Tests post route
//@access Public
router.post('/register', (req,res)=>{
    console.log("register api called...");
    User.findOne({email: req.body.email}, function (err,user){
        if(err){
            // res.status(422).send({err:"User Already exist"});
            console.log("User --register -- if :: ", err);
            res.status(500).send({err:"Server Problem"});
        }
        else{
            console.log("User --register -- else");
            if(user){
                res.status(422).send({err:"User Already exist"});
            }
            else{

                const avatar = gravatar.url(req.body.email,{
                    s:'200',//Size
                    r:'pg',//Rating
                    d:'mm'//Default
                });

                const newUser = new User({
                    name: req.body.name,
                    email : req.body.email,
                    password:req.body.password,
                    avatar:avatar
                });

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt, (err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user=> res.json(user))
                            .catch(err=> console.log(err));
                    })
                })

            }


        }
    })
});

router.post('/login', (req,res)=>{

    let email = req.body.email;
    let password = req.body.password;

    //Find user by email
    User.findOne({email:email})
        .then(user =>{

            console.log("/login -- ", user)
            //Check for user
            if(!user){
                return res.status(404).json({email : 'User not found'});
            }

            //Check Password
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                            //User Matched
                        const payload = {id: user.id, name: user.name}; //Create JWT Payload

                        //Sign Token
                        jwt.sign(payload, keys.secretOrKey, {expiresIn : 3600}, (err,token)=>{
                            res.json({
                                success:true,
                                token:'Bearer '+token
                            })
                        })

                    }
                    else{
                        return res.status(400).json({password: 'Password incorrect'});
                    }
                })


        });

})


module.exports = router;