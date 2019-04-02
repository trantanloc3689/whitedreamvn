var express = require('express');
var router = express.Router();

function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap');
    }
}


router.get('/',checkAdmin, async (req, res, next)=>{
    let listCate = await Category.find({});
    res.render('admin/category/index',{listCate});
});

router.post('/',checkAdmin, async (req, res, next)=>{
    try {
        let newCate = await Category.create({title:req.body.title});
        req.flash('success_msg',`Thêm mới thành công`);
        res.redirect('/admin/category');
    } catch (error) {
        req.flash('error_msg','Thêm mới thất bại');
        res.redirect('/admin/category');
    }
});

// update category
router.get('/update/:id',checkAdmin,async (req,res,next)=>{
    let category = await Category.findOne({_id: req.params.id});
    res.render('admin/category/update',{category});
});

router.post('/update/:id',async (req,res,next)=>{
  try {
      console.log(req.body.title);
      let update = await Category.update({_id:req.params.id},{$set: {title: req.body.title}});
      req.flash('success_msg',`Cập nhập thành công`);
      res.redirect('/admin/category');
      
  } catch (error) {
      req.flash('error_msg','Cập nhập thất bại');
      res.redirect('/admin/category');
  }
});

router.get('/delete/:id',checkAdmin,async (req,res,next)=>{
  try {
    await Category.findOneAndRemove({_id:req.params.id});
    req.flash('success_msg',`Xóa bài thành công`);
    res.redirect('/admin/category');
  } catch (error) {
    req.flash('error_msg','Xóa bài thất bại');
    res.redirect('/admin/category');
  }
});


module.exports = router;