const mongoose=require('mongoose')

const connectDB=()=>{
    mongoose.connect('mongodb://localhost:27017/contact-manager', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('connect to db')
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports=connectDB