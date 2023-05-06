const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
      user : { type: ObjectId, ref: 'User' },
	  books : [{ type: ObjectId, ref: 'Book' }],
	  totalAmount: Number
})

const OrderModel = mongoose.model("book",orderSchema)

module.exports = {
    OrderModel
}