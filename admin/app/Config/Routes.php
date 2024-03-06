<?php

use CodeIgniter\Router\RouteCollection;

/*
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->post('/login', 'LoginController::index');

$routes->get('employees', 'EmployeeController::index');
$routes->post('employees', 'EmployeeController::create');
$routes->get('employees/(:num)', 'EmployeeController::show/$1');
$routes->put('employees/(:num)', 'EmployeeController::update/$1');
$routes->delete('employees/(:num)', 'EmployeeController::delete/$1');

$routes->get('accesslevel', 'AccessLevelController::index');
$routes->post('accesslevel', 'AccessLevelController::create');
$routes->get('accesslevel/(:num)', 'AccessLevelController::show/$1');
$routes->put('accesslevel/(:num)', 'AccessLevelController::update/$1');
$routes->delete('accesslevel/(:num)', 'AccessLevelController::delete/$1');
