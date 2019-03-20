var express = require('express');
var router = express.Router();

router.get('/',async(req,res)=>{
    res.render('site/page/index');
})

router.get('/shop',async(req,res)=>{
    res.render('site/page/shop');
})

router.get('/new-in',async(req,res)=>{
    res.render('site/page/new-in');
})

router.get('/blog',async(req,res)=>{
    res.render('site/page/blog');
})

router.get('/contact',async(req,res)=>{
    res.render('site/page/contact');
})

router.get('/about',async(req,res)=>{
    res.render('site/page/about');
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
