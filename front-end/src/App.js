import React, { Component } from 'react';
import './App.css';
import './Components/FontAwesomeIcons';
// import Flag from './Components/Flag/Flag';
import ToDoItem from './Components/ToDoItem/ToDoItem';
import AddTask from './Components/AddTask/AddTask';
import ToolBar from './Components/ToolBar/ToolBar';
// import DB from './server/db';

const todoApiEndpoint = "/api/todo"

class App extends Component {
  state = {
    settings: {
      visibility: true,
      showTime: true
    },
    todoList: [],
    deleteHistory: []
  };
  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    let allTodos =  await fetch(todoApiEndpoint + '/all')
      .then(res => res.json());
    // console.log("result:", allTodos.length);
    this.setState({
      todoList: allTodos
    });
     
  }

  toggleComplete = async (id) => {
    let index = this.state.todoList.findIndex(task => task.id === id);
    let { completed } = this.state.todoList[index];

    const response = await fetch(todoApiEndpoint + '/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        completed: !completed
      })
    });

    if (response.status === 200) {
      this.fetchTodos();
    }    
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

  addTask = async (description) => {
    const sortOrder = this.state.todoList.length;
    const response = await fetch(todoApiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description,
        sortOrder
      })
    });
    if (response.status === 200) {
      this.fetchTodos();
    } 
  
  } 

  deleteTask = async (id) => {
    const response = await fetch(todoApiEndpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    });
    if (response.status === 200) {
      let index = this.state.todoList.findIndex(task => task.id === id);
      this.setState({
        deleteHistory: this.state.deleteHistory.concat({...this.state.todoList[index]})
      });
      this.fetchTodos();
    }    
  }

  updateTask = async (id, description) => {
    const response = await fetch(todoApiEndpoint + '/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        description
      })
    });

    // console.log(response);
    if (response.status === 200) {
      this.fetchTodos();
    }    
  
  }

  undoDelete = async () => {
    if (!this.state.deleteHistory.length) {
      return;
    }
    const newDeleteHistory = [...this.state.deleteHistory];
    const item = newDeleteHistory.pop();

    const response = await fetch(todoApiEndpoint + '/restore', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    if (response.status === 200) {
      console.log('successfully restored item:', item);
      this.setState({
        deleteHistory: newDeleteHistory
      });
      this.fetchTodos();
    }
  }

  render() { 
    const visibility = this.state.settings.visibility;
    const tasks = this.state.todoList
      .filter(task => visibility || !task.completed)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((task, i) => 
        <ToDoItem 
          task={task} 
          settings={this.state.settings}
          toggleComplete={this.toggleComplete.bind(this, task.id)} 
          key={task.id}
          number={i}
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
