const express = require("express")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "randomjwtsecret"

const app = express()

app.use(express.json())

const users = [];


app.post("/signup", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    users.push({
        username: username,
        password: password
    })

    res.json({
        message: "You are signed up"
    })

    console.log(users)
})

app.post("/signin", function (req, res) {
    const username = req.body.username
    const password = req.body.password

    let foundUser = null

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i];
        }   
    }


    if (foundUser){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET)

        res.json({
            token: token
        })
    } else{
        res.status(403).send({
            message: "Invalid username or password"
        })
    }

    console.log(users)
})  

app.get("/me", function (req, res){
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token, JWT_SECRET)

    const username = decodedInfo.username

    const user = users.find(user => user.username === username)
    if (user){
        res.send({
            username: user.username,
            password: user.password
        })
    } else{
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000)