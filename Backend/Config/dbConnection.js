const mongoose = require('mongoose')
require('dotenv').config()
// const mongooseURI = procee.env.MONGOOSE_URI;

const connectionWithDb = async (mongooseURI)=>{
    try{
        await mongoose.connect(mongooseURI)
        console.log("Connection with DataBase is DONE")
    } catch(e){
        console.log(e.message);
    }
    
}
 
module.exports = connectionWithDb;