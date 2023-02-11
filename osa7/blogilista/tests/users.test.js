const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

describe('user creation validation', () => {
  test('return statuscode 400 on bad creation', async () => {
    const user = {
      name: "Miikka"
    }

    await api.post('/api/users').send(user).expect(400)
  })

  test('return statuscode 400 on taken username', async () => {
    const user = {
      "username": "thekirsila",
      "name": "Michael",
      "password": "asdf"
    } 
    await api.post('/api/users').send(user).expect(400)
  })
})