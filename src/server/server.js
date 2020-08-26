const express = require('express');

const app = express();

const port = 5000;


app.get('/todos', (req, res) => {
    res.json({
        message: "Hi from Express 2!"
    })
});

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})
