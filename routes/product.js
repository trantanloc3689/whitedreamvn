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

function checkAdmin(req, res, next){
   
    if(req.isAuthenticated()){
      next();
    }else{
      res.redirect('/admin/dang-nhap');
    }
}


router.get('/',checkAdmin, async (req, res, next)=>{
  let cate = await Category.find({});
  let listPro = await Product.find({});
  res.render('admin/product/index',{cate:cate, listPro})
});

router.post('/',checkAdmin,upload.array('img_url_prod', 5), async (req, res, next)=>{
  try {
    let length = req.files.length;
    let arrImg= [];
    for(i=0;i<length;i++){
      arrImg.push(req.files[i].filename);
    }

    let newPro = await Product.create({
      name: req.body.name,
      name_slug: bodauTiengViet(req.body.name),
      description: req.body.description,
      price: req.body.price,
      img_url: arrImg,
      category: req.body.category_id,
      color: req.body.color.split('-'),
      size: req.body.size.split('-'),
    });
    req.flash('success_msg',`Thêm mới thành công`);
    res.redirect('/admin/product');
  } catch (error) {
    req.flash('error_msg','Thêm mới thất bại');
    res.redirect('/admin/product');
  }
});

// update product

router.get('/update/:id', checkAdmin,async (req, res, next)=>{
  let cate = await Category.find({});
  let product = await Product.findOne({_id:req.params.id});
  res.render('admin/product/update',{cate:cate, product})
});

router.post('/update/:id',checkAdmin,upload.array('img_url_prod', 5), async (req, res, next)=>{
  try {
    let length = req.files.length;
    let arrImg= [];
    for(i=0;i<length;i++){
      arrImg.push(req.files[i].filename);
    };
    let updatePro = {
      name: req.body.name,
      name_slug: bodauTiengViet(req.body.name),
      description: req.body.description,
      price: req.body.price,
      img_url: arrImg,
      category: req.body.category_id,
    };
    let pro = await Product.findOne({_id: req.params.id});
    var path = "./public/upload/" + pro.img_url;
    await Product.findOneAndUpdate({_id:req.params.id},updatePro);

    fs.unlinkSync(path);
    req.flash('success_msg',`Thêm mới thành công`);
    res.redirect('/admin/product');
  } catch (error) {
    req.flash('error_msg','Thêm mới thất bại');
    res.redirect('/admin/product');
  }
});

router.get('/delete/:id',checkAdmin,async (req,res,next)=>{
  try {
    await Product.findOneAndRemove({_id:req.params.id});
    req.flash('success_msg',`Xóa bài thành công`);
    res.redirect('/admin/product');
  } catch (error) {
    req.flash('error_msg','Xóa bài thất bại');
    res.redirect('/admin/product');
  }
});

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