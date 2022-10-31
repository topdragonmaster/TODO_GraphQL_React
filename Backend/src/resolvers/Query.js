const Query = {
  users(parent, args, { db }, info) {
      if (!args.query) {
        return db.users;
      }
      
      const existUser = db.users.filter((user) => {
        return user.username === args.query.username && user.password === args.query.password
      });
  
      console.log(existUser)
      return existUser
  },

  todos(parent, args, { db }, info) {
   
    return db.todos.filter((todo) => {
      return todo.owner === args.query
    });
  },
}
export { Query as default };