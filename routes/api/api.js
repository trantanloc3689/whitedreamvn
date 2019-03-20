var express = require('express');
var router = express.Router();


router.get('/',async(req,res)=>{
    res.json({name:"loc"});
});

router.get('/products',async(req,res)=>{
    let listPro = await Product.find({});
    res.json(listPro);
});

router.get('/product/:id',async(req,res)=>{
    let product = await Product.findOne({_id:req.params.id});
    res.json(product);
});

module.exports = router;