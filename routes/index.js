var express = require('express');
var router = express.Router();


router.get('/',async(req,res)=>{
    let notifies = await Notifies.find({});
    let listPro = await Product.find({}).sort({created: -1});
    res.render('site/page/index',{title: 'Home', listPro, notifies });
})


router.get('/product-detail/:id',async(req,res)=>{
    let notifies = await Notifies.find({});
    let aPro = await Product.findOne({_id:req.params.id}).sort({created: -1});
    res.render('site/page/product-detail', {aPro , notifies});
    // res.send(aPro.img_url[0])
})

router.get('/shop',async(req,res)=>{
    let notifies = await Notifies.find({});
    let listPro = await Product.find({}).sort({created: -1});
    res.render('site/page/shop',{title: 'Shop',listPro, notifies});
})

router.get('/new-in',async(req,res)=>{
    let notifies = await Notifies.find({});
    let listPro = await Product.find({}).sort({created: -1}).limit(12);
    res.render('site/page/new-in',{title: 'New-in',listPro, notifies});
})

router.get('/blog',async(req,res)=>{
    let notifies = await Notifies.find({});
    let listBlog = await Blog.find({}).sort({created: -1});
    res.render('site/page/blog',{title: 'Blog', listBlog, notifies});
});

router.get('/blog-detail/:id',async(req,res)=>{
    let notifies = await Notifies.find({});
    let aBlog = await Blog.findOne({_id:req.params.id});
    res.render('site/page/blog-detail',{title: 'Blog', aBlog, notifies});
});


router.get('/contact',async(req,res)=>{
    let notifies = await Notifies.find({});
    res.render('site/page/contact',{title: 'Contact', notifies});
})

router.get('/about',async(req,res)=>{
    let notifies = await Notifies.find({});
    res.render('site/page/about',{title: 'About', notifies});
})

router.get('/cart',async(req,res)=>{
    res.render('site/page/cart');
})



module.exports = router;
