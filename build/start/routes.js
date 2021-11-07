"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', () => {
    return 'Hello world';
});
Route_1.default.post('/register', 'AuthController.register');
Route_1.default.get('/logout', 'AuthController.logout');
Route_1.default.post('/login', 'AuthController.login');
Route_1.default.get('/posts', 'PostsController.getPosts');
Route_1.default.post('/posts', 'PostsController.createPost');
Route_1.default.patch('/posts/:id', 'PostsController.updatePost');
Route_1.default.delete('/posts/:id', 'PostsController.deletePost');
//# sourceMappingURL=routes.js.map