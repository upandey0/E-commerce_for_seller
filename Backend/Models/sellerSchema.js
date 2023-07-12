const mongoose = require('mongoose')
const JWT = require('jsonwebtoken')
require('dotenv').config()

const sellerDetails = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [3,'Name can"t" be that sort']
    },
    email:{
        type: String,
        required: true,
        unique: [true, "Seller with this email already exists"]
    },
    password:{
        type: String,
        required: true,
        minLength: [8,"Length of password can't' be that sort"]
    }
    
})

sellerDetails.methods = {
       sellerJWTToken(){
        return JWT.sign({id: this._id, email: this.email},process.env.SECRET_KEY,
            {expiresIn: '24h'})
       }
}

module.exports = mongoose.model("SellerDetail",sellerDetails)