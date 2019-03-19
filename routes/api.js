var express = require('express');
var router = express.Router();

router.get('/api',async(req,res)=>{
    let listPro = await Product.find({});
    res.json(listPro);
});

module.exports = router;