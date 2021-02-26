const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'initial', name: 'Initial user', passwordHash: 'secret' })
    await user.save()
  })

  test('creating new user succeeds', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'New1',
      name: 'New User',
      password: 'newsecretpass'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper status code if username is taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'initial',
      name: 'Taken username',
      password: 'secretpassword'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('existing users should be returned in JSON', async () => {
    await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when adding invalid user, returns status code 400 and a reason', () => {
  test('if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'u',
      name: 'Invalid user',
      password: 'Password'
    }
    const res = await api.post('/api/users')
      .send(invalidUser)
      .expect(400)

    expect(res.body.error).toContain('`username` (`u`) is shorter than the minimum allowed length')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      name: 'Invalid',
      password: 'password'
    }

    const res = await api.post('/api/users')
      .send(invalidUser)
      .expect(400)

    expect(res.body.error).toContain('`username` is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'InvalidPass',
      name: 'Missing password'
    }

    const res = await api.post('/api/users')
      .send(invalidUser)
      .expect(400)

    expect(res.body.error).toContain('password is required')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUser = {
      username: 'InvalidPass',
      name: 'Short password',
      password: 's'
    }

    const res = await api.post('/api/users')
      .send(invalidUser)
      .expect(400)

    expect(res.body.error).toContain('password should be atleast 3 characters long')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
