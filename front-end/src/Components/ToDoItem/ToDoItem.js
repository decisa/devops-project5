import React, { useState, useEffect } from  'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import './ToDoItem.css'


const ToDoItem = (props) => {

    let { createdAt, completedOn, completed, description, id } = props.task;
    let { showTime } = props.settings;

    // adding state to control edit functionality
    const [editModeState, setEditModeState] = useState({
        editMode: false,
        value: description
    })

    // set focus to input if input updated:
    useEffect(() => {
        if (editModeState.editMode) {
            document.getElementById(`edit-${id}`).focus();
            // console.log('focused');
        }
    });

    

    const changeHandler = (e) => {
        setEditModeState({
            ...editModeState,
            value: e.target.value
        })
        // console.log(e.target.value);
    }

    const toggleEditMode = () => {
        setEditModeState({
            ...editModeState,
            editMode: !editModeState.editMode
        })
    }

    const updateTaskHandler = () => {
        toggleEditMode();

        if (description !== editModeState.value)
            props.updateTask(editModeState.value);
    }

    const shortcutsHandler = (e) => {
        switch(e.keyCode) {
            case 13: // Enter
                // console.log(e.target.value)
                updateTaskHandler();
                break;
            case 27: // ESC
                toggleEditMode();
                break;
            default:
        }
        // console.log(`key: ${e.key}, keyCode: ${e.keyCode}`);
    }


    // ************** COMPONENT LAYOUT HELPERS **************
    // "DD MMM'YY, LT"
    // "YYYY-MM-DD hh:mm:ss"
    const timeInfo = (
        <>
            <div className="col-6 todoitem-date">date added:<br /><span>{moment(createdAt, "YYYY-MM-DD HH:mm:ss Z").format("YYYY-MM-DD hh:mm:ssa")}</span></div>
            { completedOn ? <div className="col-6 todoitem-date">date completed:<br /><span>{moment(completedOn, "YYYY-MM-DD HH:mm:ss Z").format("YYYY-MM-DD hh:mm:ssa")}</span></div> : null }
        </>);

    const displayDescription = (<span className={"col-12 todoitem-desc" + (completed ? " todoitem-completed": "")}>{props.number + 1}. {description}</span>);
    const editDescription = (
        <input
            id={`edit-${id}`} 
            className="w-100 pl-3"
            type="text" 
            placeholder="describe your task"
            onKeyDown={ shortcutsHandler }
            value={ editModeState.value }
            onChange={ changeHandler }
        />);

    const editButtons = (
        <>
            <FontAwesomeIcon
                icon="check"
                className="icon icon-green"
                onClick={updateTaskHandler}/>
            <FontAwesomeIcon 
                icon="ban"
                className="icon icon-red"
                onClick={ toggleEditMode }/>
        </>);

    const displayButtons = (
        <>
            <FontAwesomeIcon
                icon="pencil-alt"
                className="icon icon-grey"
                onClick={ toggleEditMode }/>
            <FontAwesomeIcon 
                icon="times"
                className="icon icon-red"
                onClick={ props.deleteTask }/>
        </>);

    const checkBoxChecked = (<FontAwesomeIcon icon={["fas", "check"]} className="icon-sm icon-grey" onClick={props.toggleComplete}/>);
    const checkBoxNotChecked = (<div className="icon-sm icon-grey" onClick={props.toggleComplete} >&nbsp;</div>)
    const editIcon = (
        <FontAwesomeIcon
            icon="pencil-alt"
            className="icon-sm icon-green"
        />);

    // ************** RENDER COMPONENT **************

    return (
        <div className="row todoitem border border-secondary my-1 py-2 rounded align-items-center">
            <div className="col-1 todoitem-controls" >
                { editModeState.editMode ? editIcon : (completed ? checkBoxChecked : checkBoxNotChecked) }
            </div>
            <div className="col row no-gutters todoitem-info">                
                { editModeState.editMode ? editDescription : displayDescription}                  
                { showTime ? timeInfo : null}
            </div>
            <div className="col-4 col-2-md row no-gutters align-self-center justify-content-end">
                { editModeState.editMode ? editButtons : displayButtons }          
            </div>
        </div>
    );
}

export default ToDoItem;