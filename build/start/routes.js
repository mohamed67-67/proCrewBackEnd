"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/', 'TasksController.index');
    Route_1.default.post('/tasks', 'TasksController.store');
    Route_1.default.patch('/tasks/:id', 'TasksController.update');
    Route_1.default.delete('/tasks/:id', 'TasksController.destroy');
}).middleware('auth');
Route_1.default.get('/register', 'AuthController.showRegister').middleware('guest');
Route_1.default.post('/register', 'AuthController.register');
Route_1.default.post('/logout', 'AuthController.logout');
Route_1.default.get('/login', 'AuthController.showlogin').middleware('guest');
Route_1.default.post('/login', 'AuthController.login');
//# sourceMappingURL=routes.js.map