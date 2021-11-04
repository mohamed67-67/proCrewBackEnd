import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'
import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class TasksController {
    public async index({ view }: HttpContextContract) {
        const tasks = await Task.all()
        return view.render('tasks/index', { tasks })
    }

    public async store({ request, response, session, auth }: HttpContextContract) {

        const SchemaValidation = schema.create({
            title: schema.string({ trim: true }, [
                rules.maxLength(255)
            ])
        })

        const ValidatedData = await request.validate({
            schema: SchemaValidation,
            messages: {
                'title.required': 'Enter task title',
                'title.maxLength': 'task title limits are 255 chars'
            }
        })

        await Task.create({
            title: ValidatedData.title,
            userId: auth.user?.id
        })

        // await auth.user?.related('tasks').create({
        //     title: ValidatedData.title
        // })

        session.flash('notification', 'Task added succesfully!')
        return response.redirect('back')
    }

    public async update({ request, params, response, session }: HttpContextContract) {
        const task = await Task.findOrFail(params.id)

        task.isCompleted = !!request.input('completed')

        await task.save()

        session.flash('notification', 'task is marked as done')

        response.redirect().back()
    }

    public async destroy({ params, response, session }: HttpContextContract) {
        const task = await Task.findOrFail(params.id)

        await task.delete()

        session.flash('notification', 'task was deleted')

        response.redirect().back()
    }
}
