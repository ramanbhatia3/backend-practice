const express = require("express")

const app = express()



let numberOfRequestForUser = 0

setInterval(() => {
    numberOfRequestForUser = 0
}, 1000);

app.use(function(req, res, next){
    const userId = req.headers["user-id"]
    if (numberOfRequestForUser[userId]) {
        numberOfRequestForUser[userId] += 1
        if (numberOfRequestForUser[userId] > 5) {
            res.status(404).send("NO ENTRY")
        }
    } else {
        numberOfRequestForUser[userId] = 1
        next()
    }
})

app.get("/user", function(req,res){
    res.status(200).json({ name:"Raman" })
})

app.post("/user", function(req,res){
    res.status(200).json({ msg:"Created Dummy User" })
})

app.listen(3000)