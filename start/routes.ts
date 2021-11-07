/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', () => {
    return 'Hello world'
})
// Auth Routes
Route.post('/register', 'AuthController.register')

Route.get('/logout', 'AuthController.logout')

Route.post('/login', 'AuthController.login')


// Posts Routes

// Route.group(() => {
Route.get('/posts', 'PostsController.getPosts')
Route.post('/posts', 'PostsController.createPost')
Route.patch('/posts/:id', 'PostsController.updatePost')
Route.delete('/posts/:id', 'PostsController.deletePost')
// }).middleware('auth')


