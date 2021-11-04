"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Guest {
    async handle({ auth, response }, next) {
        if (auth.isLoggedIn) {
            return response.redirect('/');
        }
        await next();
    }
}
exports.default = Guest;
//# sourceMappingURL=Guest.js.map