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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersServices = exports.users = void 0;
const usersData_1 = require("../data/usersData");
exports.users = usersData_1.usersData;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield usersData_1.usersData;
        return result;
    });
}
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield usersData_1.usersData.find(data => data.id === id.toString());
        if (user === undefined)
            throw new Error('El id no existe');
        return user;
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        return user;
    });
}
function updateUser(id, updateData) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        return updateData;
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id)
            throw new Error('No existe el id');
        return 'User eliminado';
    });
}
exports.usersServices = {
    getAllUsers,
    getById,
    createUser,
    updateUser,
    delete: _delete,
};
