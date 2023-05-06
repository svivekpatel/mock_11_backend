const express = require("express")

const { connection } = require("./db")
const { bookRouter } = require("./routes/books.route")
const { userRouter } = require("./routes/users.route")
const { orderRouter } = require("./routes/orders.route")

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/user",userRouter)

app.use("/books",bookRouter)

app.use("/orders",orderRouter)

app.listen(8080, async()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("not able to connect to db")
        console.log({"msg":error.message})
    }
    console.log("server is running in port 8080")
})