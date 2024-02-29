const express = require('express')
const app = require('./app')
const port = process.env.port || 3000

app.get('/', (req,res) => {
    return res.send('hi');
})



app.listen(port, () => console.log(`app listening at http://localhost:${port}`))