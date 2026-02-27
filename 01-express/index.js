const express = require("express")
const app = express()

function sum(n){
    let ans = 0;
    for (let i = 0; i <= n; i++){
        ans += i;
    }
    return ans;
}

app.get("/", function (req, res){
    const n = Number(req.query.n)
    const ans = sum(n)
    res.send(`Your answer is ${ans}`)
})

app.listen(3000)