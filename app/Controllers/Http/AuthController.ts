import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {

    public showRegister({ view }: HttpContextContract) {
        return view.render('auth/register')
    }

    public async register({ response, auth, request }: HttpContextContract) {

        try {
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

            response.json(user)

            await auth.login(user)
        } catch (error) {


            response.json({ error: 'this Email is Already Registered!!' })
        }
    }

    public async logout({ auth }: HttpContextContract) {
        await auth.logout()
    }

    public showlogin({ view }: HttpContextContract) {
        return view.render('auth/login')
    }


    public async login({ response, auth, request }: HttpContextContract) {

        const { email, password } = request.all()

        try {
            await auth.attempt(email, password)
            response.json({ authorized: auth.isLoggedIn, user: auth.user })


        } catch (error) {
            return response.json({ error: error.message })

        }
    }
}
