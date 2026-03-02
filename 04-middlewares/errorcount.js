const express = require("express")

const app = express()

let errorCount = 0

app.get("/user", function(req, res){
    throw new Error("User not found");
    res.status(200).json({ name:"Raman" })
    
})

app.post("/user", function(req, res){
    res.status(200).json({ name:"User Created!" })
})

app.post("/errorCount", function(req, res){
    res.status(200).json({ errorCount })
})

// error handling middleware

app.use(function (err, req, res, next){
    res.status(404).send({})
    errorCount += 1
})

app.listen(3000)