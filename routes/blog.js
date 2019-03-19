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

router.get('/',async (req,res)=>{
    let listBlog = await Blog.find({});
    res.render('admin/blog/index',{listBlog})
})

router.post('/', upload.single('img_url'),async (req,res)=>{
    try {
        let newBlog = await Blog.create({
            name: req.body.name,
            description: req.body.description,
            tag: req.body.tag,
            img_url: req.file.filename
        });
        
        req.flash('success_msg',`Thêm mới thành công`);
        res.redirect('/admin/blog');
    } catch (error) {
        req.flash('error_msg','Thêm mới thất bại');
        res.redirect('/admin/blog');
    }
})

// update blog
router.get('/update/:id',async (req,res,next)=>{
    let blog = await Blog.findOne({_id: req.params.id});
    console.log(blog);
    res.render('admin/blog/update',{blog})
});

router.post('/update/:id', upload.single('img_url'),async (req,res,next)=>{
  try {
      let blog = await Blog.findOne({_id: req.params.id}); 
      let path = "./public/upload/" + blog.img_url;
      let updateBlog = {
          name: req.body.name,
          description: req.body.description,
          tag: req.body.tag,
          img_url: req.file.filename
      };
      Blog.findByIdAndUpdate({_id:req.params.id},updateBlog,(err,data)=>{
        if(err)
          throw err;
        fs.unlinkSync(path);
        req.flash('success_msg',`Thêm mới thành công`);
        res.redirect('/admin/blog');
      });
      
  } catch (error) {
      req.flash('error_msg','Thêm mới thất bại');
      res.redirect('/admin/blog');
  }
});

router.get('/delete/:id',async (req,res,next)=>{
  try {
    await Blog.findOneAndRemove({_id:req.params.id});
    req.flash('success_msg',`Xóa bài thành công`);
    res.redirect('/admin/blog');
  } catch (error) {
    req.flash('error_msg','Xóa bài thất bại');
    res.redirect('/admin/blog');
  }
});

module.exports = router;
