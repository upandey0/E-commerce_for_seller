const Seller = require('../Models/sellerSchema');
const emailValidator = require('email-validator')
const bcryptJs = require('bcryptjs');


// SignUp for the seller is designed : It might be  modified as per wants: 


exports.sellerSignup = async(req,res)=>{

    const {name,email,password} = req.body;

    const validMail = emailValidator.validate(email);
    if(!validMail){
        return res.status(404).json({
            message: "Please Enter Valid Email "
        })
    }

    if(!name || !password){
        return res.json({
            message: "All Fields are required"
        })
    }

    const encryptedPassword = await bcryptJs.hash(password,10);


    try{
        const newSeller = await Seller.create({name,email,password: encryptedPassword});
        return res.status(200).json({
            success: true,
            message: "userCreated Successfully"
        })
        
    } catch(e){
        console.log(e.message);
        return res.status(404).json({
            success: false,
            message: "Unable to create user"
        })
    }
 

}

// SignIn functionality for the seller is designed and after :
//that only will proceed for products because I first want to dedicate product \
// corresponding to the particular seller : 
// I have to search It with chatGPT beacuse designing complexDatabases might be required.

exports.sellerSignIn = async (req,res) =>{

    const {email,password} = req.body;
    const sellerExistance = await Seller.findOne({email}).select("+password")
    if (!sellerExistance) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    bcryptJs.compare(password,sellerExistance.password).then((res)=>{
        if(!res)
        {
            return res.send('Invalid PassWord')
        }
        
    })
   const token = sellerExistance.sellerJWTToken();
    sellerExistance.password = null;
    const cookieOption = {
        age: 60*60*24*1000,
        httpOnly: true
    }
    res.cookie("token",token,cookieOption);
    res.status(200).json({
        success: true,
        message: "Logged In successFully",
        user: sellerExistance
    })

}

exports.addProducts = async(req,res)=>{
    
}