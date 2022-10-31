const users = [
    {
        id: '1',
        username: 'Andrew',
        email: 'andrew@example.com',
        password: 'Dragon1!'
    },
    {
        id: '2',
        username: 'Sarah',
        email: 'sarah@example.com',
        password: 'Dragon1!'
    },
    {
        id: '3',
        username: 'Mike',
        email: 'mike@example.com',
        password: 'Dragon1!'
    },
];

const todos = [
    {
        id: '1',
        name: 'shopping',
        completed: true,
        owner: '1'
    },
    {
        id: '2',
        name: 'eating',
        completed: false,
        owner: '2'
    },
    {
        id: '3',
        name: 'shopping',
        completed: false,
        owner: '1'
    },
    {
        id: '4',
        name: 'shopping',
        completed: true,
        owner: '3'
    },
    {
        id: '5',
        name: 'shopping',
        completed: true,
        owner: '3'
    },
]

const db = {
    users,
    todos,
  };
  
  export { db as default };