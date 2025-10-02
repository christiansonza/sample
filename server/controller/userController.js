const UserModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const addUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const exist = await UserModel.findOne({email})
        if(exist) return res.status(400).json({message:'user already exists'})
        
        const firstUser = (await UserModel.countDocuments()) === 0
        const role = firstUser ? 'admin' : 'user'

        const hashedPass = await bcrypt.hash(password,10)
        const newUser = await UserModel.create({name,email,password:hashedPass,role})
        res.status(201).json(newUser)
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

const Login = async(req,res)=>{
    try{
        const {email,password}= req.body
        const user = await UserModel.findOne({email})
        if(!user) return res.status(400).json('wrong email')
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(400).json({message:'wrong password'})
        
            const token = jwt.sign(
                {id:user._id,email:user.email},
                process.env.JWT_SECRET,
                {expiresIn:process.env.EXPIRES}
            )

            res.cookie('jwt',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                sameSite:'strict',
                maxAge: 24*60*60*1000
            })

        res.status(200).json('logged in successfully')
    }catch(error){
        res.status(400).json({message:error.message})
    }
}

module.exports = {
    addUser,
    Login
}