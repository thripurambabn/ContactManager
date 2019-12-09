const mongoose=require('mongoose')
const Schema=mongoose.Schema

const contactSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10
    },
    category:{
        type:String,
        enum:['home','work']
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Contact=mongoose.model('connect',contactSchema)

module.exports=Contact