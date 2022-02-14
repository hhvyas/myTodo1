import React from "react";
import Form from "./Form";
import ToDo from "./ToDo";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todoToShow: "all"
    };
  }

  addTodo = (todo) => {
    if (!todo.text.trim()) return;
    console.log(this.state.todos);
    todo.text = todo.text.trim();
    this.setState({
      todos: [todo, ...this.state.todos],
      todoToShow: "all"
    });
  };

  toggle = (toggleIndex, e) => {
    e.preventDefault();
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === toggleIndex) {
          return {
            ...todo,
            complete: !todo.complete
          };
        } else {
          return todo;
        }
      })
    });
  };

  Updatedelete = (deletedTodoIndex) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== deletedTodoIndex)
    });
  };

  deleteAllComplete = () => {
    this.setState({
      todos: this.state.todos.filter((todo) => !todo.complete)
    });
  };

  toggleAll = () => {
    const compare = this.state.todos.map((todo) => todo.complete);
    this.setState({
      todos: this.state.todos.map((todo) => {
        return {
          ...todo,
          complete: compare.some((isCompleted) => !isCompleted) ? true : false
        };
      })
    });
  };

  render() {
    let todosTobeRendered = [];
    let classNamea = "midbtn";
    let classNameb = "midbtn";
    let classNamec = "midbtn";
    if (this.state.todoToShow === "all") {
      todosTobeRendered = this.state.todos;
      classNamea += " select";
    } else if (this.state.todoToShow === "active") {
      todosTobeRendered = this.state.todos.filter((todo) => !todo.complete);
      classNameb += " select";
    } else if (this.state.todoToShow === "complete") {
      todosTobeRendered = this.state.todos.filter((todo) => todo.complete);
      classNamec += " select";
    }
    return (
      <div>
        <div className="header">Todo List</div>
        <div className="Form">
          <Form onSubmit={this.addTodo} onClick={this.toggleAll} />
          {todosTobeRendered.length > 0 &&
            todosTobeRendered.map((todo) => (
              <ToDo
                key={todo.id}
                toggle={(e) => this.toggle(todo.id, e)}
                text={todo.text}
                complete={todo.complete}
                todo={todo}
                Ondelete={() => {
                  this.Updatedelete(todo.id);
                }}
              />
            ))}
        </div>
        <div className="footer">
          <div>
            {this.state.todos.filter((todo) => !todo.complete).length} items
            left
          </div>
          <div className="firstthree">
            <button
              value="All"
              className={classNamea}
              onClick={(e) => this.update(e, "all")}
            >
              All
            </button>
            <button
              value="Active"
              className={classNameb}
              onClick={(e) => this.update(e, "active")}
            >
              Active
            </button>
            <button
              value="Completed"
              className={classNamec}
              onClick={(e) => this.update(e, "complete")}
            >
              Completed
            </button>
          </div>
          <div className="last">
            <button className="glow-on-hover" onClick={this.deleteAllComplete}>
              Clear completed
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default TodoList;
