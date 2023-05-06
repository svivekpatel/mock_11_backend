const express = require("express")
const { BookModel } = require("../models/books.model")

const bookRouter = express.Router()

//1-read
bookRouter.get("/",async(req,res)=>{
    try {
        const query = req.query
        const books = await BookModel.find(query)
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//2-read by id
bookRouter.get("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        const books = await BookModel.find({_id:id})
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    
})

//3-create
bookRouter.post("/",async(req,res)=>{
    const payload = req.body
    try {
        const newBook = new BookModel(payload)
        await newBook.save()
        res.status(201).send({"msg":"book has been added"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
    

})

//4-update
bookRouter.patch("/:id",async(req,res)=>{
    const {id} = req.params
    const payload = req.body
    try {
        await BookModel.findByIdAndUpdate({_id:id},payload)
        res.status(204).send({"msg":"book has been updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

//5-delete
bookRouter.delete("/:id",async(req,res)=>{
    const {id} = req.params
    try {
        await BookModel.findByIdAndDelete({_id:id})
        res.status(202).send({"msg":"book has been deleted"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {
    bookRouter
}