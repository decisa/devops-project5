const express = require('express');
const bodyParser = require('body-parser')


const { todo } = require('./db');

const app = express();
const jsonParser = bodyParser.json();
const port = 5000;

app.get('/api/todo/all', async  (req, res) => {
    let result = await todo.all();
    res.json(result);
});

app.post('/todos', jsonParser, async  (req, res) => {
    // console.log(req.body);
    let { description, sort_order } = req.body;
    // let result = await todo.add();
    let result = await todo.add(description, sort_order);
    res.sendStatus(200);
});

app.delete('/todos', jsonParser, async  (req, res) => {
    // console.log(req.body);
    let { id } = req.body;
    // let result = await todo.add();
    let result = await todo.del(id);
    if (result.affectedRows === 1) {
        console.log(`successfully removed todo ID=${id} from database`);
    } else {
        console.log(`todo ID=${id} was not found. cannot delete`);
    }
    res.sendStatus(200);
});


app.put('/todos', jsonParser, async  (req, res) => {
    // console.log(req.body);
    let { id, description, sort_order, completed } = req.body;
    // let result = await todo.add();
    let result = await todo.update(id, description, sort_order, completed);
    if (result.affectedRows === 1) {
        console.log(`successfully updated todo ID=${id}`);
    } else {
        console.log(`todo ID=${id} was not found. cannot update`);
    }
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})
