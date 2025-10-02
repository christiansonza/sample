const jwt = require('jsonwebtoken')
const UserModel = require('../Models/userModel')

const authMiddleware = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt
        if(!token) res.status(401).json('no token, unauthorized')
        
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            const user = await UserModel.findById(decode.id).select('-password')
        
        req.user = user
        next()
        
    }catch(err){
        res.status({err:'expired token, unauthorized'})
    }
}

module.exports = authMiddleware