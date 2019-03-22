var express = require('express');
var router = express.Router();


router.get('/',checkAdmin,async (req,res)=>{
    let listNotifies = await Notifies.find({});
    res.render('admin/notify/index',{listNotifies});
});

router.post('/',checkAdmin,async (req,res)=>{
    try {
        let newNotify = await Notifies.create({title:req.body.title, status: 1});
        req.flash('success_msg',`Thêm mới thành công`);
        res.redirect('/admin/notifi');
    } catch (error) {
        req.flash('error_msg','Thêm mới thất bại');
        res.redirect('/admin/notifi');
    }
});

router.get('/delete/:id',checkAdmin,async (req,res,next)=>{
    try {
      await Notifies.findOneAndRemove({_id:req.params.id});
      req.flash('success_msg',`Xóa bài thành công`);
      res.redirect('/admin/notifi');
    } catch (error) {
      req.flash('error_msg','Xóa bài thất bại');
      res.redirect('/admin/notifi');
    }
  });


function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap');
    }
}
module.exports = router;