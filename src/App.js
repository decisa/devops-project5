import React, { Component } from 'react';
import './App.css';
import Flag from './Components/Flag/Flag';
import ToDoItem from './Components/ToDoItem/ToDoItem';
import AddTask from './Components/AddTask/AddTask';
import ToolBar from './Components/ToolBar/ToolBar';

class App extends Component {
  state = {
    input: "change this text",
    todoList: [
      {
        order: 0,
        timeCreated: 1598148045822,
        timeCompleted: null,
        completed: false,
        description: "Create React todo App"
      },
      {
        order: 1,
        timeCreated: 1598148380431,
        timeCompleted: 1598155919779,
        completed: true,
        description: "Upload to github"
      },
      {
        order: 2,
        timeCreated: 1598148499197,
        timeCompleted: null,
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

  toggleComplete = (timeCreated) => {
    let index = this.state.todoList.findIndex(task => task.timeCreated === timeCreated);
    const newList = [...this.state.todoList];
    newList[index] = {
      ...this.state.todoList[index],
      completed: ! this.state.todoList[index].completed
    };
    this.setState({
      todoList: newList
    });
  }

  addTask = (description, timeCreated) => {
    const newToDo = [...this.state.todoList];
    newToDo.push({
      order: this.state.todoList.length,
      timeCreated,
      timeCompleted: null,
      completed: false,
      description
    })
    this.setState({
      todoList: newToDo
    })
  } 

  deleteTask = (timeCreated) => {
    const index = this.state.todoList.findIndex(task => task.timeCreated === timeCreated);
    const newToDo = [...this.state.todoList];
    let removed = newToDo.splice(index, 1); // remove item from array
    this.setState({
      todoList: newToDo
    });
    console.log("removed", removed);
  }

  render() { 
    const tasks = this.state.todoList.sort((a, b) => a.order - b.order)
      .map(task => 
        <ToDoItem 
          task={task} 
          toggleComplete={this.toggleComplete.bind(this, task.timeCreated)} 
          key={task.timeCreated}
          deleteTask={this.deleteTask.bind(this, task.timeCreated)}
          />
      );

    return(
      <div className="App">
        <h1 className="text-center">Udacity DevOps Project #5</h1>
        <p className="text-center">by Art Telesh</p>

        <div className="container">
          <ToolBar />
          { tasks }
          <AddTask addTask={this.addTask}/>
        </div>
      </div>
    );
  }
}

export default App;
