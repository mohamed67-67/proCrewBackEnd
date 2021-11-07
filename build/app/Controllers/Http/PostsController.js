"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Post"));
class PostsController {
    async getPosts({ response, auth }) {
        try {
            const posts = await Post_1.default.all();
            response.json({ posts, auth });
        }
        catch (error) {
            response.json(error);
        }
    }
    async createPost({ request, response }) {
        const { title, subject, user_id, user_name } = request.all();
        const newPost = await Post_1.default.create({
            title: title,
            subject: subject,
            user_id: user_id,
            user_name: user_name
        });
        response.json(newPost);
    }
    async updatePost({ request, response }) {
        const { id } = request.params();
        const { title, subject } = request.all();
        const post = await Post_1.default.findOrFail(id);
        post.title = title;
        post.subject = subject;
        await post.save();
        response.json(post);
    }
    async deletePost({ response, request }) {
        const { id } = request.params();
        const post = await Post_1.default.findOrFail(id);
        await post.delete();
        response.send('deleted');
    }
}
exports.default = PostsController;
//# sourceMappingURL=PostsController.js.map