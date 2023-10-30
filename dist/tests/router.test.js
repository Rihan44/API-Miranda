"use strict";
// import supertest from 'supertest';
// import {app} from '../app';
// import { describe } from 'node:test';
// describe('Post Endpoints', () => {
//   it('si metes los datos bien, te loguea', async () => {
//     const res = await supertest(app)
//       .post('/login')
//       .send({
//         user: 'ASdev',
//         password: '12345',
//       })
//     expect(res.statusCode).toEqual(200)
// /*     expect(res.body).toHaveProperty('post') */
//   })
//   it('no deberia logear al meter datos incorrectos', async () => {
//     const res = await supertest(app)
//       .post('/login')
//       .send({
//         user: 'invalidUser',
//         password: 'incorrectPassword',
//       })
//     expect(res.statusCode).toEqual(500)
//   })
//   it('si vamos a /bookingsno debe entrar al no estar logueado', async() => {
//     const res = await supertest(app).get('/bookings');
//     /* expect(res.statusCode).toEqual(404); */
//     expect(res.body).toEqual('Error: El token no es el mismo, espabila');
//   })
// })
// describe('bookings tests', () => {
//   let authToken: string;
//   beforeAll(async () => {
//     const resp = await supertest(app)
//       .post('/login')
//       .send({
//         user: 'ASdev',
//         password: '12345',
//       });
//       authToken = resp.body.token;
//   })
//   it('si vamos a /bookings debe entrar', async() => {
//     const res = await supertest(app).get("/bookings").set("token", authToken);
//     expect(res.statusCode).toEqual(200);
//   })
//   it('si vamos a /bookings debe entrar y tener special_resquest', async() => {
//     const res = await supertest(app).get("/bookings").set("token", authToken);
//     expect(res.body[0]).toHaveProperty('special_request');
//   })
//  it('si cogemos un booking por id devuelve ese booking', async() => {
//     const res = await supertest(app).get("/bookings/1232CEFE").set("token", authToken);
//     expect(res.body.id).toEqual('1232CEFE');
//   })
//   it('si posteo un booking funciona', async() => {
//     const res = await supertest(app)
//       .post("/bookings")
//       .set("token", authToken)
//       .send({
//         "id": "1234ffefef",
//         "guest": "Angel Samuel",
//         "phone_number": "+1 123-456-7890",
//         "order_date": "2024-12-27",
//         "check_in": "2023-10-05",
//         "check_out": "2023-10-10",
//         "special_request": "Please provide extra towels.",
//         "room_type": "Deluxe",
//         "room_number": "049",
//         "status": "check_in",
//         "price": "245.89"
//     });
//     expect(res.body[res.body.length-1].id).toEqual('1234ffefef');
//   })
// })
