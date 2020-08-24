import React, {Component} from 'react';
import "./AddTask.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AddTask extends Component {
    state = {
        enabled: false,
        newTask: ""
    };

    

    componentDidUpdate() {
        if (this.state.enabled) {
            document.getElementById('new-task').focus();
            console.log('focused');
        }
    }

    toggleEnable = () => {
        this.setState({
            enabled: !this.state.enabled
        })
    }

    changeHandler = (e) => {
        this.setState({
            newTask: e.target.value
        })
    }

    addNewTask = () => {
        if (this.state.newTask) {
            this.props.addTask(this.state.newTask, Date.now())
            this.setState({
                newTask: ""
            });
        } else {
            document.getElementById('new-task').focus();
        }
    }

    shortcutsHandler = (e) => {
        switch(e.keyCode) {
            case 13: // Enter
                // console.log(e.target.value)
                this.addNewTask();
                break;
            case 27: // ESC
                this.toggleEnable();
                break;
            default:
        }
        // console.log(`key: ${e.key}, keyCode: ${e.keyCode}`);
    }
    
    render() {
        const enabled = this.state.enabled;


        return (
            <div className={ `row todoitem border ${enabled? "border-success": "border-light"} my-2 py-3 rounded` } >
                <div className="col-1 todoitem-controls">
                    { enabled ? <FontAwesomeIcon icon="plus" className="icon-sm icon-green" onClick={this.addNewTask} /> : ""}
                </div>
                <div className="col row no-gutters todoitem-info">
                    { enabled ? (
                        <input 
                            id="new-task"
                            className="w-100 pl-3"
                            type="text" 
                            placeholder="describe your task"
                            onKeyDown={ this.shortcutsHandler }
                            value={ this.state.newTask }
                            onChange={ this.changeHandler }/>
                      ) : ""}       
                </div>
                <div className="col-4 col-2-md row no-gutters align-self-center justify-content-end">
                    { enabled ? (
                        <>
                            <FontAwesomeIcon icon="check" className="icon icon-green" title="add task" onClick={this.addNewTask}/>
                            <FontAwesomeIcon icon="ban" className="icon icon-red" title="cancel" onClick={this.toggleEnable}/>
                            
                        </>
                    ):(
                        
                        <FontAwesomeIcon icon="plus" className="icon icon-green" onClick={this.toggleEnable}/>
                    )}
                    
                    
                </div>      
            </div>
        );

    }
}

export default AddTask