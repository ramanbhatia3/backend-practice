const express = require("express")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "randomjwtsecret"

const app = express()

app.use(express.json())

const users = [];


app.post("/signup", logger, function (req, res) {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username: username,
        password: password
    })

    // we should check if any user with the same username exists already

    res.json({
        message: "You are signed up"
    })

    console.log(users)
})

app.post("/signin", logger, function (req, res) {
    const username = req.body.username
    const password = req.body.password

    let foundUser = null

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
        }   
    }

    if (foundUser){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET)

        res.header("jwt", token)

        res.header("random", "raman")

        res.json({
            token: token
        })
    } else{
        res.status(403).send({
            message: "Credentials Incorrect"
        })
    }

    console.log(users)
})  


function logger(req, res, next){
    console.log(`${req.method} request came`)
    next()
}


function auth(req, res, next){
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if(decodedData.username){
        req.username = decodedData.username
        next()
    } else{
        res.json({
            message: "You aren not logged in"
        })
    }

}


app.get("/me", logger, auth, function (req, res){
    let foundUser = null

    for (let i = 0; i < users.length; i++){
        if (users[i].username === req.username){
            foundUser = users[i];
        }   
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})

app.listen(3000)