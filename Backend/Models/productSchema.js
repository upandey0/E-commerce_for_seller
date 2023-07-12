const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    pName:{
        type: String,
        required: true,

    },
    pPrice:{
        type: Number,
        required: true,

    },
    PBrand:{
        type: String,

    },
    pId: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("ListedProduct",productSchema);