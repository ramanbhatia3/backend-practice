const express = require("express")

const app = express()

let users = {
    1: {
        todos: []
    },
    2: {
        todos: []
    },
}


let todos = []
// store the data in a file, foundation for databases
// add user logic

// route handlers
app.post("/", function (req,res){
    // create a random id for todo
    // extract the todo title from the body
    todos.push({
        title,
        id
    })
})

app.delete("/", function (req, res){
    // extract the todo id
    // remove the todo
})

app.get("/", function (req, res){
    res.json({
        todos
    })
})
app.listen(3000) // port