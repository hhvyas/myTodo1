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

  buttonList = [
    {
      value: "all",
      active: true
    },
    {
      value: "active",
      active: false
    },
    {
      value: "complete",
      active: false
    }
  ];
  applyFilter = (e, filterValue) => {
    this.setState({ todoToShow: filterValue });
  };

  render() {
    let todosTobeRendered = [];

    if (this.state.todoToShow === "all") {
      todosTobeRendered = this.state.todos;
      this.buttonList = this.buttonList.map((list) => {
        console.log(list);
        let value = list.value;
        let active = list.value === "all";
        console.log(value, active, this.state.todoToShow);
        return { value, active };
      });
    } else if (this.state.todoToShow === "active") {
      todosTobeRendered = this.state.todos.filter((todo) => !todo.complete);

      this.buttonList = this.buttonList.map((list) => {
        console.log(list);
        let value = list.value;
        let active = list.value === "active";
        return { value, active };
      });
    } else if (this.state.todoToShow === "complete") {
      todosTobeRendered = this.state.todos.filter((todo) => todo.complete);

      this.buttonList = this.buttonList.map((list) => {
        let value = list.value;
        let active = list.value === "complete";
        return { value, active };
      });
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
            {console.log(this.buttonList[0].value)}
            {this.buttonList.map((filterButton) => {
              console.log(filterButton);
              return (
                <button
                  className={`midbtn ${filterButton.active && "select"}`}
                  onClick={(e) => this.applyFilter(e, filterButton.value)}
                >
                  {filterButton.value.toUpperCase()}
                </button>
              );
            })}
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
