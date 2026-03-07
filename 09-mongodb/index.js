const express = require("express")
const mongoose = require("mongoose")
const { UserModel, TodoModel } = require("./db")

const jwt = require("jsonwebtoken")
const { auth, JWT_SECRET } = require("./auth")

// JWT_SECRET = "ARandomJWTSecretWhichShouldBeHidden"

mongoose.connect("mongo url here")

const app = express()

app.use(express.json())

app.post("/signup", async function (req, res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });

    res.json({
        message: "SignUp Successful"
    })
})

app.post("/signin", async function (req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email: email,
        password: password
    })

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET)

        console.log(user)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Invalid credentials"
        })
    }
})

app.post("/todo", auth, async function (req, res){
    const userId = req.userId;

    const title = req.body.title;
    const done = req.body.done;

    await TodoModel.create({
        title: title,
        userId: userId,
        done: done
    })

    res.json({
        message: "Todo created"
    })
})

app.get("/todos", auth, async function (req, res){
    const userId = req.userId;

    const todos = await TodoModel.find({
        userId
    })

    res.json({
        todos
    })
})


app.listen(3000)