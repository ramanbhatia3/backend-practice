const express = require("express")

const app = express()

requestCount = 0

app.use(function (req, res, next){
    requestCount += 1
    next()
})

app.get("/user", function(req,res){
    res.status(200).json({ name:"Raman" })
})

app.post("/user", function(req,res){
    res.status(200).json({ msg:"Created Dummy User" })
})

app.get("/requestCount", function(req,res){
    res.status(200).json({ requestCount })
})


app.listen(3000)