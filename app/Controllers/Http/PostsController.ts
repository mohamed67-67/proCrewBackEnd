import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {

    public async getPosts({ response, auth }: HttpContextContract) {
        try {
            const posts = await Post.all()

            response.json({ posts, auth })
        } catch (error) {
            response.json(error)
        }
    }

    public async createPost({ request, response }: HttpContextContract) {

        const { title, subject, user_id, user_name } = request.all()

        const newPost = await Post.create({
            title: title,
            subject: subject,
            user_id: user_id,
            user_name: user_name
        })

        response.json(newPost)
    }

    public async updatePost({ request, response }: HttpContextContract) {

        const { id } = request.params()
        const { title, subject } = request.all()
        const post = await Post.findOrFail(id)

        post.title = title
        post.subject = subject

        await post.save()

        response.json(post)
    }

    public async deletePost({ response, request }: HttpContextContract) {

        const { id } = request.params()

        const post = await Post.findOrFail(id)

        await post.delete()

        response.send('deleted')

    }
}
