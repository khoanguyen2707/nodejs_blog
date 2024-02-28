const express = require('express')
const app = express()
const port = 3000


app.get('/tin-', (req,res) => {
    return res.send('hi');
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))