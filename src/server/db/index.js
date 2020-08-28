const Connection = require('./connection');
const moment = require('moment');

const query = (sqlQuery) =>
    new Promise((resolve, reject) => {
        Connection.query(sqlQuery, (err, results) => {
            if (err) {
                reject(err);
            }
            resolve(results);
        });
    });

const todoGetAll = async () => query('SELECT * from todo');

const todoGetById = async (id) => query(`SELECT * from todo WHERE (id = "${id}");`);

const todoAdd = async (description, sortOrder) => {
    const timeAdded = moment().format("YYYY-MM-DD HH:mm:ss");
    const sqlQuery = `INSERT INTO todo (description, date_added, sort_order)
    VALUES ("${description}", "${timeAdded}", "${sortOrder}");`;

    return query(sqlQuery);
}


const todoDelete = async (id) => query(`DELETE FROM todo WHERE (id = "${id}");`);

const todoUpdate = async (id, description, sort_order, completed) => {
    if (completed !== null) {
        console.log(`new status for the task should be: ${completed}`);
        return { affectedRows: 0};
    }
    return query(`UPDATE todo 
        SET description = "${description}"
        WHERE (id = "${id}");`);
};


// UPDATE `project5db`.`todo` SET `description` = 'Upload to github.com' WHERE (`id` = '2');

// DELETE FROM `project5db`.`todo` WHERE (`id` = '8');
// INSERT INTO `project5db`.`todo` (`description`, `date_added`, `completed`, `sort_order`) VALUES ('Test', '2020-08-23 11:09:27', '0', '0');


module.exports = {
    todo: {
        getAll: todoGetAll,
        getById: todoGetById,
        add: todoAdd,
        del: todoDelete,
        update: todoUpdate
    }
}