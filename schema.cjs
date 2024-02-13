const mongoose=require("mongoose")
const restaurantSchema =new mongoose.Schema({
    areaName:{
        type:String
    },
    avgRating:{
        type:Number
    },
    costForTwo:{
        type:Number
    },
    cuisines:{
        type:Array
    },
    name:{
        type:String
    }
})
const Restaurant = mongoose.model('userdetails',restaurantSchema)

const userSchema =new mongoose.Schema({
    contact:{
        type:Number
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    userName:{
        type:String
    }
})
const users = mongoose.model('restaurant',userSchema)
module.exports={Restaurant,users}