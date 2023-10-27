"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../app");
const node_test_1 = require("node:test");
(0, node_test_1.describe)('Post Endpoints', () => {
    it('si metes los datos bien, te loguea', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send({
            user: 'ASdev',
            password: '12345',
        });
        expect(res.statusCode).toEqual(200);
        /*     expect(res.body).toHaveProperty('post') */
    }));
    it('no deberia logear al meter datos incorrectos', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send({
            user: 'invalidUser',
            password: 'incorrectPassword',
        });
        expect(res.statusCode).toEqual(500);
    }));
    it('si vamos a /bookingsno debe entrar al no estar logueado', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get('/bookings');
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual('Error: El token no es el mismo, espabila');
    }));
});
(0, node_test_1.describe)('bookings tests', () => {
    let authToken;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield (0, supertest_1.default)(app_1.app)
            .post('/login')
            .send({
            user: 'ASdev',
            password: '12345',
        });
        authToken = resp.body.token;
    }));
    it('si vamos a /bookings debe entrar', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        expect(res.statusCode).toEqual(200);
    }));
    it('si vamos a /bookings debe entrar y tener special_resquest', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings").set("token", authToken);
        expect(res.body[0]).toHaveProperty('special_request');
    }));
    it('si cogemos un booking por id devuelve ese booking', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app).get("/bookings/1232CEFE").set("token", authToken);
        expect(res.body.id).toEqual('1232CEFE');
    }));
    it('si posteo un booking funciona', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.app)
            .post("/bookings")
            .set("token", authToken)
            .send({
            "id": "1234ffefef",
            "guest": "Angel Samuel",
            "phone_number": "+1 123-456-7890",
            "order_date": "2024-12-27",
            "check_in": "2023-10-05",
            "check_out": "2023-10-10",
            "special_request": "Please provide extra towels.",
            "room_type": "Deluxe",
            "room_number": "049",
            "status": "check_in",
            "price": "245.89"
        });
        expect(res.body[res.body.length - 1].id).toEqual('1234ffefef');
    }));
});
