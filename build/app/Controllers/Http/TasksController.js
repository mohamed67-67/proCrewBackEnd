"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Task"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class TasksController {
    async index({ view }) {
        const tasks = await Task_1.default.all();
        return view.render('tasks/index', { tasks });
    }
    async store({ request, response, session, auth }) {
        const SchemaValidation = Validator_1.schema.create({
            title: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.maxLength(255)
            ])
        });
        const ValidatedData = await request.validate({
            schema: SchemaValidation,
            messages: {
                'title.required': 'Enter task title',
                'title.maxLength': 'task title limits are 255 chars'
            }
        });
        await Task_1.default.create({
            title: ValidatedData.title,
            userId: auth.user?.id
        });
        session.flash('notification', 'Task added succesfully!');
        return response.redirect('back');
    }
    async update({ request, params, response, session }) {
        const task = await Task_1.default.findOrFail(params.id);
        task.isCompleted = !!request.input('completed');
        await task.save();
        session.flash('notification', 'task is marked as done');
        response.redirect().back();
    }
    async destroy({ params, response, session }) {
        const task = await Task_1.default.findOrFail(params.id);
        await task.delete();
        session.flash('notification', 'task was deleted');
        response.redirect().back();
    }
}
exports.default = TasksController;
//# sourceMappingURL=TasksController.js.map