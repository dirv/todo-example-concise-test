let todos = [];

const matchingTodo = ({ title }) =>
  todos.find(todo => todo.title === title);

export const add = todo => {
  if (matchingTodo(todo)) {
    throw new Error("that todo already exists");
  }
  todos = [ ...todos, todo ];
};

export const findMatching = title =>
  todos.filter(t => t.title.includes(title));

export const update = updatedTodo => {
  todos = [ ...todos.filter(todo => todo.title !== updatedTodo.title), updatedTodo ];
};
