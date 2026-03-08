const express = require("express")
const bcrypt = require("bcrypt")
const mongoose = require("mongoose")
const { UserModel, TodoModel } = require("./db")

const jwt = require("jsonwebtoken")
const { auth, JWT_SECRET } = require("./auth")

const { z } = require("zod")


mongoose.connect("")

const app = express()

app.use(express.json())

app.post("/signup", async function (req, res){
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        name: z.string().min(3).max(100),
        password: z.string().min(3).max(30)
    })

    // const parsedData = requiredBody.parse(req.body);

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success){
        res.json({
            message: "Invalid Format",
            error: parsedDataWithSuccess.error
        })
        return
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await UserModel.findOne({ email })

    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    console.log(hashedPassword)

    await UserModel.create({
        email: email,
        password: hashedPassword,
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
        email: email
    })

    if(!user){
        res.status(403).json({
            message: "User not found"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (passwordMatch){
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET)

        console.log(user)
        res.json({
            token: token
        })
    } else{
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
