const express = require('express');
const bodyParser = require('body-parser')
const { todo } = require('./db');

const port = 5000;
const todoApiEndpoint = '/api/todo';
const app = express();
// middleware to parse json for requests
const jsonParser = bodyParser.json();


app.get(todoApiEndpoint + '/all', async  (req, res) => {
    let result = await todo.getAll();
    res.json(result);
});

app.get(todoApiEndpoint + '/:id', async  (req, res) => {
    let result = await todo.getById(req.params.id);
    res.json(result);
});

app.post(todoApiEndpoint, jsonParser, async  (req, res) => {
    let { description, sort_order } = req.body;
    let result = await todo.add(description, sort_order);
    res.sendStatus(200);
});

app.delete(todoApiEndpoint, jsonParser, async  (req, res) => {
    let { id } = req.body;
    let result = await todo.del(id);
    if (result.affectedRows === 1) {
        console.log(`successfully removed todo ID=${id} from database`);
    } else {
        console.log(`todo ID=${id} was not found. cannot delete`);
    }
    res.sendStatus(200);
});


app.put(todoApiEndpoint, jsonParser, async  (req, res) => {
    let { id, description, sort_order, completed } = req.body;
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
