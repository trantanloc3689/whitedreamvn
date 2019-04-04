var express = require('express');
var router = express.Router();


router.get('/',async(req,res)=>{
    let notifies = await Notifies.find({});
    let listPro = await Product.find({}).sort({created: -1});
    res.render('site/page/index',{title: 'Home', listPro, notifies });
})


router.get('/product/:name',async(req,res)=>{
    let notifies = await Notifies.find({});
    let aPro = await Product.findOne({name_slug:req.params.name});
    let nameCate = await Category.findOne({_id: aPro.category});
    res.render('site/page/product-detail', {aPro , notifies, title:aPro.name, nameCate});
    // res.send(aPro.img_url[0])
})

router.get('/shop',async(req,res)=>{
    let notifies = await Notifies.find({});
    let listPro = await Product.find({}).sort({created: -1}).populate('categories');
    let listCate = await Category.find({});
    res.render('site/page/shop',{title: 'Shop',listPro, notifies,listCate});
    // res.json(listPro)
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

router.get('/blog/:name',async(req,res)=>{
    let notifies = await Notifies.find({});
    let aBlog = await Blog.findOne({name_slug:req.params.name});
    res.render('site/page/blog-detail',{title: aBlog.name, aBlog, notifies});
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

router.post('/cart',async(req,res)=>{
    try {
        let dataOrder = req.body;
        dataOrder.status = 0;
        let newOrder = await Order.create(dataOrder);
        req.flash('success_msg',`Thêm mới thành công`);
        res.redirect('/cart');
    } catch (error) {
        req.flash('error_msg','Thêm mới thất bại');
        res.redirect('/cart');
    }
})

module.exports = router;
