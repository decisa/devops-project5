import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const ToolBar = (props) => {
    const settings = props.settings;

    const testNetworkButton = (
        <FontAwesomeIcon 
            icon="network-wired" 
            className="icon icon-grey"
            title="Make a test API call"
            onClick={() => {
                fetch('api/todo/all').then(res => res.json())
                  .then(data => console.log(data));
            }}/>
    );
    return (
        <div className="row">
            <div className="col d-flex justify-content-start flex-row-reverse">
                <FontAwesomeIcon 
                    icon={ settings.visibility ? "eye" : "eye-slash" } 
                    className={`icon ${settings.visibility ? "icon-grey" : "icon-red"}`}
                    title="Toggle visibility of completed tasks"
                    onClick={props.toggleVisibility}/>

                <FontAwesomeIcon 
                    icon={["far", "clock"]} 
                    className={`icon ${settings.showTime ? "icon-grey" : "icon-red"}`}
                    title="Toggle visibility of completed tasks"
                    onClick={props.toggleTime}/>

                { testNetworkButton }

                { props.deleteHistory.length ? (
                    <FontAwesomeIcon 
                        icon="undo" 
                        className="icon icon-grey" 
                        title="Toggle visibility of completed tasks"
                        onClick={props.undoDelete}/>
                ) : (
                    null
                )}
            </div>
        </div>
    );
}

export default ToolBar;