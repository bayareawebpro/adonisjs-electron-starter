'use strict'
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
*/

Route.on('/').render('welcome')
Route.post('/', 'CommandController.index').as('command')
