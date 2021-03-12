import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('secret', 10),
    isAdmin: true,
  },
  {
    name: 'George Kaba',
    email: 'george@example.com',
    password: bcrypt.hashSync('secret', 10),
  },
  {
    name: 'Alain FlouFlou',
    email: 'alain@example.com',
    password: bcrypt.hashSync('secret', 10),
  },
  {
    name: 'Clair FlouFlou',
    email: 'clair@example.com',
    password: bcrypt.hashSync('secret', 10),
  }
]

export default users
