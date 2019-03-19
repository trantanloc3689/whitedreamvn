var express = require('express');
var router = express.Router();


router.get('/',(req,res)=>{
    res.render('admin/order/index');
});

router.get('/checked',(req,res)=>{
    res.render('admin/order/checked');
});

router.get('/check',(req,res)=>{
    res.render('admin/order/check');
});

module.exports = router;
