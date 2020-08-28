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
      // {
      //   order: 0,
      //   id: 1598148045822,
      //   timeCreated: 1598148045822,
      //   timeCompleted: null,
      //   completed: false,
      //   description: "Create React todo App"
      // },
      // {
      //   order: 1,
      //   id: 1598148380431,
      //   timeCreated: 1598148380431,
      //   timeCompleted: 1598155919779,
      //   completed: true,
      //   description: "Upload to github"
      // },
      // {
      //   order: 2,
      //   id: 1598148499197,
      //   timeCreated: 1598148499197,
      //   timeCompleted: null,
      //   completed: false,
      //   description: "Deploy the App to AWS"
      // },
      // {
      //   order: 3,
      //   id: 1598238567108,
      //   timeCreated: 1598238567108,
      //   timeCompleted: 1598328365994,
      //   completed: true,
      //   description: "Add focus on task edit "
      // },
      // {
      //   order: 4,
      //   id: 1598328418994,
      //   timeCreated: 1598328418994,
      //   timeCompleted: null,
      //   completed: false,
      //   description: "Make data persistent by adding MySQL database"
      // },
      // {
      //   order: 5,
      //   id: 1598328506876,
      //   timeCreated: 1598328506876,
      //   timeCompleted: null,
      //   completed: false,
      //   description: "Add Express.js backend routing"
      // }
    ],
    deleteHistory: []
  };
  componentDidMount() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    let allTodos =  await fetch('http://localhost:3000/api/todo/all')
      .then(res => res.json());
    // console.log("result:", allTodos.length);
    this.setState({
      todoList: allTodos
    });
     
  }

  toggleComplete = async (id) => {
    let index = this.state.todoList.findIndex(task => task.id === id);
    const newList = [...this.state.todoList];
    newList[index] = {
      ...this.state.todoList[index],
      completed: ! this.state.todoList[index].completed,
      timeCompleted: this.state.todoList[index].completed ? null : Date.now()
    };

    let {description, completed} = this.state.todoList[index];

    const response = await fetch('http://localhost:3000/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        description,
        completed: !completed
      })
    });
    // if (response.status === 200) {
    //   this.fetchTodos();
    // } 


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

  addTask = async (description) => {
    const sort_order = this.state.todoList.length;
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        description,
        sort_order
      })
    });
    if (response.status === 200) {
      this.fetchTodos();
    } 
  
  } 

  deleteTask = async (id) => {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    });
    if (response.status === 200) {
      this.fetchTodos();
    }    
  }

  updateTask = async (id, description) => {
    const response = await fetch('http://localhost:3000/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        description
      })
    });
    if (response.status === 200) {
      this.fetchTodos();
    }    
    // const index = this.state.todoList.findIndex(task => task.id === id);
    // const newToDo = [...this.state.todoList];
    // newToDo[index] = {
    //   ...newToDo[index],
    //   description: value
    // }

    // console.log(`task ID "${id}", with value "${this.state.todoList[index].description}" is being unpdated with "${value}"`);

    // this.setState({
    //   todoList: newToDo,
    // });    
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
