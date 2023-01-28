const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser("A secret"))
app.use(express.json());

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`);
});

const cookies = {};

app.get("/", (req, res) => {
    res.cookie("name", "guille", {signed: true})
    res.json("hola y te meti una cookie")
})

app.post("/cookies", (req, res) => {
    const {body} = req;
    // body = JSON.parse(body)
    // const key = Object.keys(body)[0];
    // const value = body.key
    console.log(body)
    // res.cookie(key, value, {signed: true})
    res.send({ proceso: 'ok'})
})

app.delete("/cookies", (req, res) => {
    res.cookie("name", "guille", {signed: true})
    res.send("hola y te meti una cookie")
})
