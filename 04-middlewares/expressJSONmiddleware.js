const express = require("express")

const app = express()

app.use(express.json())


app.post("/sum", function (req, res) {
    const a = req.body.a
    const b = req.body.b
    res.json({
        sum: a+b
    })
})


app.listen(3000)