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
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogById = exports.getBlogs = void 0;
const blog_1 = __importDefault(require("../models/blog"));
const user_1 = __importDefault(require("../models/user"));
const getBlogs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_1.default.findAll({
            include: {
                model: user_1.default,
                attributes: ['id', 'firstName', 'lastName', 'email'] // Adjust attributes as necessary
            }
        });
        res.status(200).json({ blogs });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});
exports.getBlogs = getBlogs;
const getBlogById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        const blog = yield blog_1.default.findByPk(blogId, {
            include: {
                model: user_1.default,
                attributes: ['id', 'firstName', 'lastName', 'email'] // Adjust attributes as necessary
            }
        });
        if (blog)
            res.status(200).json({ blog });
        else
            res.status(404).json({ error: 'Blog does not exist' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});
exports.getBlogById = getBlogById;
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.body.userId;
    try {
        const blog = yield blog_1.default.create({ title, content, userId });
        res.status(201).json({
            message: 'blog created successfully',
            blog
        });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to create blog' });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    const { title, content } = req.body;
    try {
        const [updatedRows] = yield blog_1.default.update({ title, content }, { where: { id: blogId } });
        if (updatedRows > 0)
            res.status(200).json({ message: 'Blog updated successfully' });
        else
            res.status(404).json({ error: 'Blog not found' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to edit blog' });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        const deletedRows = yield blog_1.default.destroy({ where: { id: blogId } });
        if (deletedRows > 0)
            res.status(200).json({ message: 'Blog deleted successfully' });
        else
            res.status(404).json({ error: 'Blog not found' });
    }
    catch (_a) {
        res.status(500).json({ error: 'Failed to delete Blog' });
    }
});
exports.deleteBlog = deleteBlog;
