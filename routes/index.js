var express = require('express');
var router = express.Router();

router.get('/',async(req,res)=>{
    res.render('site/page/index',{isHoverIndex: true});
})

router.get('/shop',async(req,res)=>{
    res.render('site/page/shop',{isHoverShop: true});
})

router.get('/new-in',async(req,res)=>{
    res.render('site/page/new-in',{isHoverNew: true});
})

router.get('/blog',async(req,res)=>{
    res.render('site/page/blog',{isHoverBlog: true});
})

router.get('/contact',async(req,res)=>{
    res.render('site/page/contact',{isHoverContact: true});
})

router.get('/about',async(req,res)=>{
    res.render('site/page/about',{isHoverAbout: true});
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
