var express = require('express');
var router = express.Router();

router.get('/',async(req,res)=>{
    res.render('site/page/index');
})

router.get('/api',async(req,res)=>{
    let listPro = await Product.find({});
    // res.render('site/page/index',{listPro});
    res.json(listPro);
})

// router.get('/detail/:id', function (req, res) {
//     Post.findById(req.params.id)
//     .then(post => res.render('site/page/detail',{post:post}))
//     .catch(err => res.send(err));
// });

module.exports = router;
