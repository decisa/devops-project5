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
    // console.log(result);
    res.sendStatus(200);
});


app.put(todoApiEndpoint + '/update', jsonParser, async  (req, res) => {
    let { id, description, completed } = req.body;
    let result = await todo.update(id, description, completed);

    if (result.affectedRows === 1) {
        console.log(`successfully updated todo ID=${id}`);
        res.sendStatus(200);
    } else {
        console.log(`todo ID=${id} was not found. cannot update`);
        res.sendStatus(400);
    }
});


app.put(todoApiEndpoint + '/restore', jsonParser, async  (req, res) => {
    let item = req.body;
    let result = await todo.restore(item);

    if (result.affectedRows === 1) {
        console.log(`successfully restored todo ID=${item.id}`);
        res.sendStatus(200);
    } else {
        console.log(`todo ID=${item.id} could not found be restored`);
        res.sendStatus(400);
    }
});


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})
