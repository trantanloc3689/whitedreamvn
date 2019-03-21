var express = require('express');
var router = express.Router();


router.get('/',checkAdmin,(req,res)=>{
    res.render('admin/order/index');
});

router.get('/checked',checkAdmin,(req,res)=>{
    res.render('admin/order/checked');
});

router.get('/check',checkAdmin,(req,res)=>{
    res.render('admin/order/check');
});
function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap');
    }
}
module.exports = router;
