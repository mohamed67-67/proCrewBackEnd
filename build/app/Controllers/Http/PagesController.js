"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PagesController {
    home({ view }) {
        return view.render('tasks.index');
    }
    about({ view, params }) {
        const name = params.name;
        return view.render('about', { name });
    }
    contacts({ view }) {
        return view.render('contacts');
    }
}
exports.default = PagesController;
//# sourceMappingURL=PagesController.js.map