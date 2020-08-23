import React, {Component} from 'react';
import "./AddTask.css";

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

    shortcutsHandler = (e) => {
        switch(e.keyCode) {
            case 13: // Enter
                console.log(e.target.value)
                this.props.addTask(e.target.value, Date.now())
                this.setState({
                    newTask: ""
                })
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
                <div className="col-1 todoitem-controls align-self-center justify-items-center">
                    { enabled ? <span>new task</span> : ""}
                </div>
                <div className="col row no-gutters todoitem-info">
                    { enabled ? (
                        <input 
                            id="new-task"
                            className="w-100"
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
                            <button className="btn btn-outline-success btn-text">&#10003;</button>
                            <button className="btn btn-outline-danger todoitem-delete" title="cancel" onClick={this.toggleEnable} >&#x2300;</button> 
                        </>
                    ):(
                        <button className="btn btn-outline-success btn-text" onClick={this.toggleEnable} >+ add task</button>
                    )}
                    
                    
                </div>      
            </div>
        );

    }
}

export default AddTask