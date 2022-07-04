
const request = require("supertest")

const baseUrl = 'http://localhost:5000'

describe('Todos endpoint', () => {
  let user, token
  it('create user return a 201 status code', async () => {
    const response = await request(baseUrl)
      .post('/users')
      .send({ email: 'ju@gmail.com', password: 'juan123' })
    user = JSON.parse(response.text).response.newUser
    expect(response.statusCode).toBe(201)
  })

  it('find stations return a 200 status code', async () => {
    const response = await request(baseUrl)
      .get('/stations?latitude=20.666378&longitude=-103.34882&distance=0.1')
      .set('authorization', `bearer ${user.token}`)
    expect(response.statusCode).toBe(200)
  })

  it('find stations without authorization return a 401 status code', async () => {
    const response = await request(baseUrl)
      .get('/stations?latitude=20.666378&longitude=-103.34882&distance=0.1')
    expect(response.statusCode).toBe(401)
  })

  it('find stations without distance param return a 400 status code', async () => {
    const response = await request(baseUrl)
      .get('/stations?latitude=20.666378&longitude=-103.34882')
      .set('authorization', `bearer ${user.token}`)
    expect(response.statusCode).toBe(400)
  })

  it('delete user return a 202 status code', async () => {
    const response = await request(baseUrl)
      .delete(`/users/${user._id}`)
      .set('authorization', `bearer ${user.token}`)
    expect(response.statusCode).toBe(200)
  })

})
