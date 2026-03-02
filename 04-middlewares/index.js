const express = require("express")

const app = express()

// function isOldEnough(age){
//     if (age>14) {
//         return true
//     } else {
//         return false
//     }
// }


// app.get("/ride1", function (req, res) {
//     if (isOldEnough(req.query.age)) {
//         res.json({
//             msg:"You have ridden the ride 1"
//         })
//     } else {
//         res.status(411).json({
//             msg:"Sorry, you are not of the age yet to ride ride 1"
//         })
//     }
// })

// app.get("/ride2", function (req, res) {
//     if (isOldEnough(req.query.age)) {
//         res.json({
//             msg:"You have ridden the ride 2"
//         })
//     } else {
//         res.status(411).json({
//             msg:"Sorry, you are not of the age yet to ride ride 2"
//         })
//     }
// })


function isOldEnoughMiddleware(req, res, next){
    const age = req.query.age
    if (age>14) {
        next()
    } else {
        res.json({
            msg:"Sorry, you are not of the age yet to ride ride 1"
        })
    }
}

// app.get("/ride1", isOldEnoughMiddleware, function (req, res) {
//     res.json({
//         msg:"You have ridden the ride 1"
//     })
// })

// app.get("/ride2", isOldEnoughMiddleware, function (req, res) {
//     res.json({
//         msg:"You have ridden the ride 2"
//     })
// })


app.use(isOldEnoughMiddleware)

app.get("/ride1", function (req, res) {
    res.json({
        msg:"You have ridden the ride 1"
    })
})


app.get("/ride2", function (req, res) {
    res.json({
        msg:"You have ridden the ride 2"
    })
})

app.listen(3000)