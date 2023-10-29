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
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


// Only index function will be inlcuded
Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('register', 'AuthController.register')

  Route.group(() => {
    Route.get('/students', 'StudentsController.index')
    Route.get('/students/:id', 'StudentsController.show')
    Route.post('/students', 'StudentsController.store')
    Route.put('/students/:id', 'StudentsController.edit')
    Route.patch('/students/:id', 'StudentsController.update')
    Route.delete('/students/:id', 'StudentsController.destroy')
  }).middleware('auth:api')
}).prefix('api/v1')

