import React, { Component } from 'react';
import './App.css';
import './Components/FontAwesomeIcons';
// import Flag from './Components/Flag/Flag';
import ToDoItem from './Components/ToDoItem/ToDoItem';
import AddTask from './Components/AddTask/AddTask';
import ToolBar from './Components/ToolBar/ToolBar';
// import DB from './server/db';

class App extends Component {
  state = {
    settings: {
      visibility: true,
      showTime: true
    },
    todoList: [
      {
        order: 0,
        id: 1598148045822,
        timeCreated: 1598148045822,
        timeCompleted: null,
        completed: false,
        description: "Create React todo App"
      },
      {
        order: 1,
        id: 1598148380431,
        timeCreated: 1598148380431,
        timeCompleted: 1598155919779,
        completed: true,
        description: "Upload to github"
      },
      {
        order: 2,
        id: 1598148499197,
        timeCreated: 1598148499197,
        timeCompleted: null,
        completed: false,
        description: "Deploy the App to AWS"
      },
      {
        order: 3,
        id: 1598238567108,
        timeCreated: 1598238567108,
        timeCompleted: 1598328365994,
        completed: true,
        description: "Add focus on task edit "
      },
      {
        order: 4,
        id: 1598328418994,
        timeCreated: 1598328418994,
        timeCompleted: null,
        completed: false,
        description: "Make data persistent by adding MySQL database"
      },
      {
        order: 5,
        id: 1598328506876,
        timeCreated: 1598328506876,
        timeCompleted: null,
        completed: false,
        description: "Add Express.js backend routing"
      }
    ],
    deleteHistory: []
  };

  toggleComplete = (id) => {
    let index = this.state.todoList.findIndex(task => task.id === id);
    const newList = [...this.state.todoList];
    newList[index] = {
      ...this.state.todoList[index],
      completed: ! this.state.todoList[index].completed,
      timeCompleted: this.state.todoList[index].completed ? null : Date.now()
    };
    this.setState({
      todoList: newList
    });
  }

  toggleVisibilitySetting = () => {
    this.setState({
      settings: {
        ...this.state.settings,
        visibility: ! this.state.settings.visibility
      }
    });
  }

  toggleTimeSetting = () => {
    this.setState({
      settings: {
        ...this.state.settings,
        showTime: ! this.state.settings.showTime
      }
    });
  }

  addTask = (description, timeCreated) => {
    const newToDo = [...this.state.todoList];
    newToDo.push({
      order: this.state.todoList.length,
      id: timeCreated,
      timeCreated,
      timeCompleted: null,
      completed: false,
      description
    })
    this.setState({
      todoList: newToDo
    })
  } 

  deleteTask = (id) => {
    const index = this.state.todoList.findIndex(task => task.id === id);
    const newToDo = [...this.state.todoList];
    const removed = newToDo.splice(index, 1); // remove item from array

    this.setState({
      todoList: newToDo,
      deleteHistory: this.state.deleteHistory.concat(removed)
    });    
  }

  updateTask = (id, value) => {
    const index = this.state.todoList.findIndex(task => task.id === id);
    const newToDo = [...this.state.todoList];
    newToDo[index] = {
      ...newToDo[index],
      description: value
    }

    // console.log(`task ID "${id}", with value "${this.state.todoList[index].description}" is being unpdated with "${value}"`);

    this.setState({
      todoList: newToDo,
    });    
  }

  undoDelete = () => {
    if (!this.state.deleteHistory.length) {
      return;
    }

    const newDeleteHistory = [...this.state.deleteHistory];
    const item = newDeleteHistory.pop();
    this.setState({
      todoList: this.state.todoList.concat([item]),
      deleteHistory: newDeleteHistory
    })
  }

  render() { 
    const visibility = this.state.settings.visibility;
    const tasks = this.state.todoList
      .filter(task => visibility || !task.completed)
      .sort((a, b) => a.order - b.order)
      .map(task => 
        <ToDoItem 
          task={task} 
          settings={this.state.settings}
          toggleComplete={this.toggleComplete.bind(this, task.id)} 
          key={task.timeCreated}
          deleteTask={this.deleteTask.bind(this, task.id)}
          updateTask={this.updateTask.bind(this, task.id)}
          />
      );

    return(
      <div className="App">
        <h1 className="text-center">Udacity DevOps Project #5</h1>
        <p className="text-center">by Art Telesh</p>

        <div className="container">
          <ToolBar 
            settings={this.state.settings} 
            toggleVisibility={this.toggleVisibilitySetting} 
            toggleTime={this.toggleTimeSetting}
            deleteHistory={this.state.deleteHistory}
            undoDelete={this.undoDelete} />
          { tasks }
          <AddTask addTask={this.addTask}/>
        </div>
      </div>
    );
  }
}

export default App;
