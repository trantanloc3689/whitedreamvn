var express = require('express');
var router = express.Router();

router.get('/',async(req,res)=>{
    res.render('site/page/index',{title: 'Home'});
})

router.get('/shop',async(req,res)=>{
    res.render('site/page/shop',{title: 'Shop'});
})

router.get('/new-in',async(req,res)=>{
    res.render('site/page/new-in',{title: 'New-in'});
})

router.get('/blog',async(req,res)=>{
    res.render('site/page/blog',{title: 'Blog'});
})

router.get('/contact',async(req,res)=>{
    res.render('site/page/contact',{title: 'Contact'});
})

router.get('/about',async(req,res)=>{
    res.render('site/page/about',{title: 'About'});
})


router.get('/product-detail',async(req,res)=>{
    res.render('site/page/product-detail');
})


router.get('/cart',async(req,res)=>{
    res.render('site/page/cart');
})


router.get('/api',async(req,res)=>{
    let listPro = await Product.find({});
    res.json(listPro);
})


module.exports = router;
