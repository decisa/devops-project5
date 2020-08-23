import React, { Component } from 'react';
import './App.css';
import Flag from './Flag/Flag';
import ToDoItem from './ToDoItem/ToDoItem';

class App extends Component {
  state = {
    input: "change this text",
    todoList: [
      {
        order: 0,
        timeCreated: 1598148045822,
        timeFinished: null,
        completed: false,
        description: "Create React todo App"
      },
      {
        order: 1,
        timeCreated: 1598148380431,
        timeFinished: null,
        completed: false,
        description: "Upload to github"
      },
      {
        order: 2,
        timeCreated: 1598148499197,
        timeFinished: null,
        completed: false,
        description: "Deploy the App to AWS"
      }      
    ]
  };

  changeInputHandler = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  render() { 
    const tasks = this.state.todoList.sort((a, b) => a.order - b.order).map(task => <ToDoItem task={task} key={task.timeCreated}/>);

    return(
      <div className="App">
        <h1>Hey, It's Art Project #5</h1>
        <Flag />
        { tasks }
      </div>
    );
  }
}

export default App;
