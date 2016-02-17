var React = require('react');
var TodoStore = require('../stores/todo_store.js');

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      list: TodoStore.all()
    };
  },

  componentDidMount: function () {
    TodoStore.addChangedHandler(this.todosChanged);
    TodoStore.fetch();

  },

  componentWillUnmount: function () {
    TodoStore.removeChangedHandler(this.todosChanged);
  },

  todosChanged: function () {
    this.setState( { list: TodoStore.all() });
  },

  render: function() {
    var listElements = function(){
      return this.state.list.map(function(todo, idx) {
        // return (<li key={idx}>{todo.title}</li>);
        return (<TodoListItem todo={todo}>)
      });
    }.bind(this);

    return (
      <div>
        <ul>
          {listElements()}
        </ul>
      </div>
    );
  }
});

module.exports = TodoList;
