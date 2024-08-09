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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.status(200).json({ users });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield user_1.default.findByPk(userId);
        if (user)
            res.status(200).json({ user });
        else
            res.status(404).json({ error: 'user does not exist' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    try {
        const user = yield user_1.default.create({ firstName, lastName, email });
        res.status(201).json({
            message: 'user created successfully',
            user
        });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to created user' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;
    try {
        const [updatedRows] = yield user_1.default.update({ firstName, lastName, email }, { where: { id: userId } });
        if (updatedRows > 0)
            res.status(200).json({ message: 'User updated successfully' });
        else
            res.status(404).json({ error: 'User not found' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to edit user' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const deletedRows = yield user_1.default.destroy({ where: { id: userId } });
        if (deletedRows > 0)
            res.status(200).json({ message: 'User deleted successfully' });
        else
            res.status(404).json({ error: 'User not found' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to delete User' });
    }
});
exports.deleteUser = deleteUser;
