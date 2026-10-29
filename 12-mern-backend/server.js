const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

const PORT = process.env.PORT

app.use(express.json())

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: "true",
        message: "server is running"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})