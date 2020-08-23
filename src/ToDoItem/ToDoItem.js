import React from 'react';


const ToDoItem = (props) => {
    // order: 0,
    // timeCreated: 1598148045822,
    // timeFinished: null,
    // completed: false,
    // description: "Create React todo App"
    let {timeCreated, timeFinished, completed, description} = props.task;
    return (
        <p>{ `created: ${timeCreated}, finished: ${timeFinished ? timeFinished : 'not yet'}, completed: ${completed}, Description: ${description}` }</p>
    );
}

export default ToDoItem;