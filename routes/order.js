var express = require('express');
var router = express.Router();


router.get('/',checkAdmin, async (req,res)=>{
  let listOrder = await Order.find({}).sort({created: -1});
    res.render('admin/order/index',{listOrder});
});

router.get('/checked',checkAdmin,async (req,res)=>{
  let listOrder = await Order.find({status:1}).sort({created: -1});
    res.render('admin/order/checked',{listOrder});
});

router.get('/check',checkAdmin,async (req,res)=>{
  let listOrder = await Order.find({status:0}).sort({created: -1});
    res.render('admin/order/check',{listOrder});
});

router.get('/tocheck/:id',checkAdmin,async (req,res)=>{
  await Order.findOneAndUpdate({_id:req.params.id},{status: 0});
    res.redirect('/admin/order/check');
});

router.get('/tochecked/:id',checkAdmin,async (req,res)=>{
  await Order.findOneAndUpdate({_id:req.params.id},{status: 1});
  res.redirect('/admin/order/checked');
});

function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap');
    }
}
module.exports = router;
