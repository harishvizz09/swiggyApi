const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const cors=require("cors")
const express = require("express")
const {Restaurant,users} =require("./schema.cjs")
const app =express()
app.use(bodyparser.json())
app.use(cors())
const connectToDb=async function(){
    try{
      await mongoose.connect('mongodb+srv://sri:sri123@atlascluster.vy7odna.mongodb.net/swigge?retryWrites=true&w=majority')
      console.log("connected to DB :)")
      const port =process.env.PORT||8000
      app.listen(port,function(){
      console.log(`listening to the port : ${port} :)`)
    })
    }catch(error){
      console.log(error)                               
      console.log("fail to connect :(")
    }
}
connectToDb()
app.post("/add-restaurant",async function(request,response){
    try{
        await Restaurant.create({
            "areaName":request.body.areaName,
            "avgRating":request.body.avgRating,
            "costForTwo":request.body.costForTwo,
            "cuisines":request.body.cuisines,
            "name":request.body.name
        })
           response.status(200).json({
             "status":"sucess",
             "message":"restaurant added"
           })
    }catch(error){
           response.status(500).json({
            "status":"failure",
            "message":"try again",
            "erroe":error
           })
    }
})
app.get("/get-restaurant-details",async function(request,response){
    try{
        const Restaurantdetails =await Restaurant.find()
        response.status(200).json(Restaurantdetails)
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not fetch",
            "erroe":error
           })
    }
})

app.post('/create-newuser',async function(request,response){
    try{
     await users.create({
        "userName":request.body.username,
        "password":request.body.password,
        "email":request.body.email,
        "contact":request.body.contact
     })
     response.status(201).json({
        "status":"success",
        "message":"user created"
     })
    }catch(error){
        response.status(500).json({
            "status":"not received",
            "message":"internal server error"
        })
     }
    
  })

  app.post('/validate-user',async function(request,response){
    try {
        const user = await users.findOne({
            "email" : request.body.email,
            "password" : request.body.password 
        })
        if(user) {
            response.status(200).json({
                "message" : "valid user"
            })
        } else {
            response.status(401).json({
                "message" : "invalid user"
            })
        }
    } catch(error) {
        response.status(500).json({
            "message" : "internal server error"
        })
    }
    
  })

  