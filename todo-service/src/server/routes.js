const todoApiEndpoint = '/api/todo';

export default (app) => {
    app.get(todoApiEndpoint + '/all', (req, res) => {
        res.send("All todos !");
    })
} 