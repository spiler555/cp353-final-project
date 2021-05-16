// Importing Modules
import React, { Component } from 'react';
import axios from 'axios';


// Importing React-Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing Components
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';

import './App.css';

class App extends Component {
  state = {
    todos: []
  }
// Get Todos (get method)
  componentDidMount() {
    axios.get('http://localhost:8000/todo')
      .then(res => this.setState({ todos: res.data }));
  }

  // Toggle Complete (put method)
  markComplete = (id) => {
      this.setState({
        todos: this.state.todos.map(todo => {
          if(todo.id === id)
            todo.completed = !todo.completed;
          return todo;
        })
      });

    var todo_status = this.state.todos.filter(function(x) { return x.id === id })[0];  //select todo by id
    var status = { completed: todo_status.completed };
    axios.put(`http://localhost:8000/todo/${id}`, status)
          .then(res => this.setState());

  }

  // Delete Todo (delete method)
  delTodo = (id) => {
    axios.delete(`http://localhost:8000/todo/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }

// Add Todo (post method)
  addTodo = (title) => {
    axios.post('http://localhost:8000/todo', {
      title: title,
      completed: false
    })
      .then(res => this.setState({
        todos: [...this.state.todos, res.data]
      }));
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <br />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete = {this.markComplete} delTodo={this.delTodo}/>
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;