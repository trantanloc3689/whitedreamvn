var express = require('express');
var router = express.Router();
var fs = require('fs');

var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

var upload = multer({ storage: storage });

router.get('/',checkAdmin,async (req,res)=>{
    let listBlog = await Blog.find({});
    res.render('admin/blog/index',{listBlog})
})

router.post('/', checkAdmin,upload.single('img_url'),async (req,res)=>{
    try {
        let newBlog = await Blog.create({
            name: req.body.name,
            title: req.body.title || "",
            meta_description: req.body.meta_description || "",
            name_slug: bodauTiengViet(req.body.name),
            description: req.body.description,
            tag: req.body.tag,
            img_url: req.file.filename,
            summary: req.body.summary
        });
        
        req.flash('success_msg',`Thêm mới thành công`);
        res.redirect('/admin/blog');
    } catch (error) {
        req.flash('error_msg','Thêm mới thất bại');
        res.redirect('/admin/blog');
    }
})

// update blog
router.get('/update/:id',checkAdmin,async (req,res,next)=>{
    let blog = await Blog.findOne({_id: req.params.id});
    console.log(blog);
    res.render('admin/blog/update',{blog})
});

router.post('/update/:id',checkAdmin, upload.single('img_url'),async (req,res,next)=>{
  try {
      let blog = await Blog.findOne({_id: req.params.id}); 
      // let path = "/upload/" + blog.img_url;
      let updateBlog = {
          name: req.body.name,
          title: req.body.title || "",
          meta_description: req.body.meta_description || "",
          name_slug: bodauTiengViet(req.body.name),
          summary: req.body.summary,
          description: req.body.description,
          tag: req.body.tag,
          img_url: req.file.filename
      };
      Blog.findByIdAndUpdate({_id:req.params.id},updateBlog,(err,data)=>{
        if(err)
          throw err;
        req.flash('success_msg',`Thêm mới thành công`);
        res.redirect('/admin/blog');
      });
      
  } catch (error) {
      req.flash('error_msg','Thêm mới thất bại');
      res.redirect('/admin/blog');
  }
});

router.get('/delete/:id',checkAdmin,async (req,res,next)=>{
  try {
    await Blog.findOneAndRemove({_id:req.params.id});
    req.flash('success_msg',`Xóa bài thành công`);
    res.redirect('/admin/blog');
  } catch (error) {
    req.flash('error_msg','Xóa bài thất bại');
    res.redirect('/admin/blog');
  }
});

function checkAdmin(req, res, next){
   
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/admin/dang-nhap');
  }
}

function bodauTiengViet(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/ /g, "-");
  str = str.replace(/\./g, "-");
  return str;
}


module.exports = router;
