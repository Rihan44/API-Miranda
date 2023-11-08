"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const connection_1 = __importDefault(require("./utils/connection"));
const express_1 = __importDefault(require("express"));
const auth_1 = require("./middlewares/auth");
const cors_1 = __importDefault(require("cors"));
const bookings_1 = require("./controllers/bookings");
const rooms_1 = require("./controllers/rooms");
const contact_1 = require("./controllers/contact");
const users_1 = require("./controllers/users");
const login_1 = require("./controllers/login");
const public_json_1 = __importDefault(require("./data/public.json"));
(0, connection_1.default)();
exports.app = (0, express_1.default)();
// middlewares
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
// public routes
exports.app.use('/info', (_req, res) => res.json(public_json_1.default));
exports.app.use('/login', login_1.loginController);
exports.app.use(auth_1.authLogin);
// private routes
exports.app.use('/bookings', bookings_1.bookingsController);
exports.app.use('/users', users_1.usersController);
exports.app.use('/rooms', rooms_1.roomController);
exports.app.use('/contacts', contact_1.contactController);
exports.app.use((err, _req, res, _next) => {
    console.error(err);
    return res.status(500).json({ error: true, message: 'Application error' });
});
