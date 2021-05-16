import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
    getStyle = () => {
        return {
            background: '#F4F4F4',
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '20px',
            letterSpacing: '2px',
            boxShadow: '10px 10px 5px grey',
            textDecoration: this.props.todo.completed ? 'line-through' : 'none',
        }
    };

    render() {
        const { id, title, completed, createAt } = this.props.todo;
        return (
            <div style={ this.getStyle() }>
                <p>
                <h3>
                    <input type="checkbox" onChange={ this.props.markComplete.bind(this, id ) } checked={ completed ? 'checked': '' }/>{' '}
                    &nbsp;{title}
                
                    <button onClick={this.props.delTodo.bind(this, id)} style={{ float: 'right' }}>
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </h3>
                
                </p>
                {createAt}
            </div>
            
        )
    }
}

// PropTypes
TodoItem.PropTypes = {
    todos: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}


export default TodoItem;