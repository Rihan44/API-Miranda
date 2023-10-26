import supertest from 'supertest';
import {app} from '../app';

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await supertest(app)
      .post('/login')
      .send({
        user: 'ASdev',
        password: '12345',
      })
    expect(res.statusCode).toEqual(200)
/*     expect(res.body).toHaveProperty('post') */
  })
})
