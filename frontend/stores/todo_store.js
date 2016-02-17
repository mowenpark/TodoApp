var   _todos = [],
  _callbacks = [];

var TodoStore = {

  all: function () {
    return _todos.slice();
  },

  fetch: function () {
    $.get("api/todos",
    {},
    function (data) {
      _todos = data;
      TodoStore.changed();
    });
  },

  find: function(id){
    return _todos.find(function(f){
      return f.id === id;
    });
  },

  create: function (todo) {
    $.post("api/todos", todo, function (todo) {
      _todos.push(todo);
      TodoStore.changed();
    });
  },

  destroy: function (id) {
    var todo = TodoStore.find(id);

    if (typeof todo !== "undefined"){
      $.ajax({
        url: "api/todos/" + id,
        type: 'DELETE',
        success: function () {
          _todos = _todos.filter(function (f) {
            if (f["id"] !== id) {
              return true;
            }
          });
          TodoStore.changed();
        },
      });
    }
  },

  toggleDone: function (id) {
    var todo = TodoStore.find(id);
    todo.done = !todo.done;
    $.ajax({
      url: "api/todos/" + id,
      type: 'PATCH',
      success: function () {
        // maybe add a change to _todos
        TodoStore.changed();
      },
      data: {todo: {title: todo.title, body: todo.body, done: todo.done}}
    });
  },

  addChangedHandler: function (callback) {
    _callbacks.push(callback);
  },

  removeChangedHandler: function (callback) {
    var idx;

    for (var i = 0; i < _callbacks.length; i++) {
      if (callback === _callbacks[i]) {
        idx = i;
        break;
      }
    }

    if (idx === undefined) {return;}

    _callbacks.splice(idx, 1);
  },

  changed: function () {
    _callbacks.forEach(function (cb) {
      cb();
    });
  }
};

module.exports = TodoStore;
