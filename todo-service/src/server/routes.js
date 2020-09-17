import { Todo } from "#root/db/models";

const todoApiEndpoint = '/api/todo';


export default (app) => {
    app.post(todoApiEndpoint, async  (req, res) => {
        let { description, sortOrder } = req.body;
        let result = await Todo.create({
            description,
            sortOrder
        });
        if (result.dataValues.id) {
            return res.sendStatus(200);
        }
        else {
            return res.sendStatus(400);
        }
    });

    app.get(todoApiEndpoint + '/all', async (req, res) => {
        const todos = await Todo.findAll();
        
        return res.json(todos);
    });

    app.put(todoApiEndpoint + '/update', async (req, res) => {
        // console.log(req.body);
        let { id, description, completed } = req.body;
        let result;

        if (completed !== undefined) {
            result = await todoToggleCompleted(id, completed);
        }
        else {
            result = await todoUpdateDescription(id, description);
        }
        
        if (result[0]) {
            return res.sendStatus(200);
        }
        return res.sendStatus(400);
    });


    app.put(todoApiEndpoint + '/restore', async  (req, res) => {
        let item = req.body;
        console.log(item);
        let result = await Todo.create({
            ...item,
            updatedAt: new Date()
        });

        if (result.dataValues.id === item.id) {
            console.log(`successfully restored todo ID=${item.id}`);
            res.sendStatus(200);
        } else {
            console.log(`todo ID=${item.id} could not found be restored`);
            res.sendStatus(400);
        }
    });


    app.delete(todoApiEndpoint, async (req, res) => {
        let { id } = req.body;

        let result = await Todo.destroy({
            where: { id }
        })

        if (result) {
            console.log(`successfully removed todo ID=${id} from database`);
            return res.sendStatus(200);
        } else {
            console.log(`todo ID=${id} was not found. cannot delete`);
            return res.sendStatus(400);
        }
        console.log(result);
        
    });
} 

const todoToggleCompleted = (id, completed) => {
    let completedOn = null;
    if (completed) {
        completedOn = new Date();
    }
    return Todo.update({
        completed,
        completedOn
    }, {
        where: { id }
    });
}

const todoUpdateDescription = (id, description) => {
    return Todo.update({
        description
    }, {
        where: { id }
    });
}