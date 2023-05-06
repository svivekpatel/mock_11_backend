const express = require("express")
const { UserModel } = require("../models/user.model")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


//register
userRouter.post("/register",async(req,res)=>{
    const {name,email,password,isAdmin} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            res.status(201).send({"msg":"user alredy exist"})
        }else{
            bcrypt.hash(password, 4, (err,hash)=>{
                const user= new UserModel({name,email,password:hash,isAdmin})
                user.save()
                res.status(201).send({"msg":"Registration Successfull!"})
            })
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


//login
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(201).send({"msg":"Login Successfull!"})
                }else{
                    res.status(400).send({"msg":"wrong password"})
                }
            })
        }else{
            res.status(400).send({"msg":"user does not exists"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


module.exports = {
    userRouter
}