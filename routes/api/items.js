const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); 

const Item = require('../../models/item');

router.get('/',(req,res)=>{
    Item.find()
        .sort({date:-1})
        .then(items=> res.json(items))
        .catch(err=> console.log(err));
});

// @route POST api/items
// @desc Create an item
// @access Public
router.post('/',auth,(req,res)=>{
    const newItem = new Item({
        name:req.body.name
    })
    newItem.save()
           .then(item=> res.json(item))
           .catch(err=> console.log(err));
})

// @route DELETE api/items/:id
// @desc Delete an item
// @access Public
router.delete('/:id',auth,(req,res)=>{
    Item.findById(req.params.id)
        .then(item => item.remove().then(()=>res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));
})


module.exports = router;