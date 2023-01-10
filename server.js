const express = require('express');
const bcyrpt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();


const database = {
  users: [
    {
      id: '999',
      name: 'Bob Barker',
      email: 'b',
      password: 'b',
      entries: 0,
      joined: new Date()
    },
    {
      id: '000',
      name: 'Happy Gilmore',
      email: 'happyrules@gmail.com',
      password: 'slapshot',
      entries: 0,
      joined: new Date()
    }
  ]
}

app.use(express.json());
app.use(cors());



app.get('/', (req, res) => {
  res.send(database.users);
  console.log('1');

})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email &&
      req.body.password === database.users[0].password) {
        res.status(200).json(database.users[0]);
      } else {
        res.status(400).json('error!!');
      }
  // res.json('working')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  database.users.push(
    {
      id: '001',
      name: name,
      email: email,
      entries: 0,
      joined: new Date()
    })
    res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if(!found) {
  res.status(404).json('user not found');
  }
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if(user.id === id) {
      found = true;
      user.entries ++
      return res.json(user.entries);
    }
  })
  if(!found) {
    res.status(404).json('user not found');
  }
})

app.listen(3000, () => {
  console.log('app is running on port 3000');
})
