const express = require("express");
const router = express.Router();



//@route GET api/posts/test
//@desc Tests post route
//@access Public
router.get('/test', (req,res,next)=>{
    res.json({
        msg: 'posts works'
    });

    next();
});


module.exports = router;