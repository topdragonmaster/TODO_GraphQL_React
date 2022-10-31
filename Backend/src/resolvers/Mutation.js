import uuidv4 from 'uuid/v4'

const Mutation = {
  addTodo(parent, args, {db, pubsub}, info) {
    const todo = {
      id: uuidv4(),
      ...args.data,
    };

    db.todos.push(todo);
    const userName = db.users.filter(user => user.id === args.data.owner)[0].username
    pubsub.publish('todo', {
      todo: {
        mutation: 'CREATED',
        data: todo,
        name: userName
      },
    });


    return todo;
  },

  deleteTodo(parent, args, { db, pubsub }, info) {
    const todoIndex = db.todos.findIndex((todo) => todo.id === args.id);

    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    console.log(todoIndex)
    const deletedTodos = db.todos.splice(todoIndex, 1);
    const userName = db.users.filter(user => user.id === deletedTodos[0].owner)[0].username
    pubsub.publish('todo', {
      todo:  {
        mutation: 'DELETED',
        name: userName,
        data: deletedTodos[0]
      },
    })
    return deletedTodos[0];
  },

  updateTodoCheck(parent, args, { db }, info) {
    const todoIndex = db.todos.findIndex((todo) => todo.id === args.id);

    if (todoIndex === -1) {
      throw new Error('Todo not found');
    }
    db.todos[todoIndex].completed = !db.todos[todoIndex].completed;

    console.log(db.todos)
    return db.todos[todoIndex];
  },



}

export { Mutation as default}