"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class AuthController {
    showRegister({ view }) {
        return view.render('auth/register');
    }
    async register({ response, auth, request }) {
        const schemaValidation = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }),
            email: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.email(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.unique({ table: 'users', column: 'email' })
            ]),
            password: Validator_1.schema.string({ trim: true }, [
                Validator_1.rules.confirmed()
            ])
        });
        const validatedData = await request.validate({
            schema: schemaValidation
        });
        const user = await User_1.default.create(validatedData);
        await auth.login(user);
        return response.redirect('/');
    }
    async logout({ auth, response }) {
        await auth.logout();
        response.redirect('/');
    }
    showlogin({ view }) {
        return view.render('auth/login');
    }
    async login({ response, auth, request, session }) {
        const { email, password } = request.all();
        try {
            await auth.attempt(email, password);
            response.json(auth);
            console.log(email, password);
        }
        catch (error) {
            session.flash('notification', 'fuck you');
            response.json(auth);
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map