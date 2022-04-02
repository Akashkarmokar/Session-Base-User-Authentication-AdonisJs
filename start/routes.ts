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

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

/**
 * Registration Route
 */
Route.get('/registration','AuthController.registrationIndex').as('auth.registration.form')
Route.post('/registration','AuthController.registrationStore').as('auth.registration')


/**
 * Login Route
 */
Route.get('/login','AuthController.loginIndex').as('auth.login.form')
Route.post('/login','AuthController.loginStore').as('auth.login')

