import React from 'react';
import moment from 'moment';
import './ToDoItem.css'


const ToDoItem = (props) => {
    // order: 0,
    // timeCreated: 1598148045822,
    // timeCompleted: null,
    // completed: false,
    // description: "Create React todo App"
    let {timeCreated, timeCompleted, completed, description} = props.task;

    return (
        <div className="row todoitem border border-secondary my-2 py-3 rounded">
            <div className="col-1 todoitem-controls align-self-center justify-items-center" onClick={props.toggleComplete}>
                <input  type="checkbox" checked={completed} />
            </div>
            <div className="col row no-gutters todoitem-info">
                <span className={"col-12 todoitem-desc" + (completed ? " todoitem-completed": "")}>{description}</span>
                <span className="col-6 todoitem-date">date added:<br />{moment(timeCreated).format("DD MMM'YY, LT")}</span>
                { timeCompleted ? <span className="col-6 todoitem-date">completed on:<br />{moment(timeCompleted).format("DD MMM'YY, LT")}</span> : null }
            </div>
            <div className="col-4 col-2-md row no-gutters align-self-center justify-content-end">
                <button className="btn btn-outline-success btn-text">edit</button>
                <button 
                    className="btn btn-outline-danger todoitem-delete"
                    onClick={props.deleteTask}
                    >&times;</button> 
            </div>
        </div>
    );
}

export default ToDoItem;