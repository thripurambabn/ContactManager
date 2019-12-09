const User=require('../models/User')
const _=require('lodash')

module.exports.create=(req,res)=>{
    const body=_.pick(req.body,['username','email','password']) 
    const user=new User(body)
    user.save()
    .then(()=>{
        //res.send({"id":user._id,"username":user.username,"email":user.email})
        res.send(_.pick(user,['_id','username','email']))
    }).catch((err)=>{
        res.send(err)
    })
    
}

module.exports.login=(req,res)=>{
    const body=_.pick(req.body,['email','password']) 
    User.findByCredentials(body.email,body.password)
    .then(function(user){
         return user.generateToken()
    }).then((token)=>{
        res.send({token})
    })
    .catch((err)=>{
        res.send(err)
    })
    
}


module.exports.show=(req,res)=>{
      const {user}=req
      res.send(_.pick(user,['_id','username','email']))
}

module.exports.destroy=(req,res)=>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(()=>{
        res.send({notice:'successfully logged out'})
    }).catch((err)=>{
        res.send(err)
    })
}
