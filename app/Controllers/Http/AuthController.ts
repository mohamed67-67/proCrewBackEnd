import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

    public showRegister({ view }: HttpContextContract) {
        return view.render('auth/register')
    }

    public async register({ response, auth, request }: HttpContextContract) {

        const schemaValidation = schema.create({
            name: schema.string({ trim: true }),
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.maxLength(255),
                rules.unique({ table: 'users', column: 'email' })
            ]),
            password: schema.string({ trim: true }, [
                rules.confirmed()
            ])
        })

        const validatedData = await request.validate({
            schema: schemaValidation
        })

        const user = await User.create(validatedData)

        await auth.login(user)
        return response.redirect('/')
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()
        response.redirect('/')
    }

    public showlogin({ view }: HttpContextContract) {
        return view.render('auth/login')
    }


    public async login({ response, auth, request, session }: HttpContextContract) {

        const { email, password } = request.all()

        try {
            await auth.attempt(email, password)
            response.json(auth)
            console.log(email, password);

            // response.redirect('/')

        } catch (error) {
            session.flash('notification', 'fuck you')
            response.json(auth)
            // response.redirect().back()
        }
    }
}
