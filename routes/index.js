var express = require('express');
var router = express.Router();

router.get('/',async(req,res)=>{
    let listPro = await Product.find({}).sort({created: -1});
    res.render('site/page/index',{title: 'Home', listPro });
})


router.get('/product-detail/:id',async(req,res)=>{
    let aPro = await Product.findOne({_id:req.params.id}).sort({created: -1});
    res.render('site/page/product-detail', {aPro});
    // res.send(aPro.img_url[0])
})

router.get('/shop',async(req,res)=>{
    let listPro = await Product.find({}).sort({created: -1});
    res.render('site/page/shop',{title: 'Shop',listPro});
})

router.get('/new-in',async(req,res)=>{
    let listPro = await Product.find({}).sort({created: -1}).limit(12);
    res.render('site/page/new-in',{title: 'New-in',listPro});
})

router.get('/blog',async(req,res)=>{
    let listBlog = await Blog.find({}).sort({created: -1});
    res.render('site/page/blog',{title: 'Blog', listBlog});
});

router.get('/blog-detail/:id',async(req,res)=>{
    let aBlog = await Blog.findOne({_id:req.params.id});
    res.render('site/page/blog-detail',{title: 'Blog', aBlog});
});


router.get('/contact',async(req,res)=>{
    res.render('site/page/contact',{title: 'Contact'});
})

router.get('/about',async(req,res)=>{
    res.render('site/page/about',{title: 'About'});
})

router.get('/cart',async(req,res)=>{
    res.render('site/page/cart');
})



module.exports = router;
