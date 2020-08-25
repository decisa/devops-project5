import * as mysql from 'mysql';
import config from '../config';

import Todos from './todos';

export const Connection = mysql.createConnection(config.mysql);

Connection.connect(err => {
    if (err) {
        console.log(err);
    } else {
        console.log(all good);
    }
});

export default {
    Todos
}