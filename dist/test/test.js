"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chai = require('chai');
const request = require('supertest');
const app = (0, express_1.default)();
describe('POST login ', () => {
    it('should login', () => {
    });
});
/* describe('POST Create User Wallet', () => {
    it('should create wallet for the user', () => {
        request(app)
        .post('123456/wallet')
        .send({})
        .expect(201)
        .then((res) => {
         expect(res.headers.location).to.be.eql('123456/wallet');
         // more validations can be added here as required
    });
 });
}); */ 
