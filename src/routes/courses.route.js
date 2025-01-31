const { Router } = require('express');
const { requireAuth } = require('../middlewares/authMiddleware.js');

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/course.controller.js');

const coursesRoute = Router();

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// const options = {
//   definition: {
//     openapi: "3.1.0",
//     info: {
//       title: "Mi API",
//       version: "1.0.0",
//       description: "Documentación de la API",
//       contact: { name: 'Developer' },
//       servers: [
//         {
//           url: 'http://localhost:3000',
//           description: 'Local server'
//         }
//       ]
//     }
//   },
//   apis: ['./index.js'] // Ubicación de las rutas en index.js
// };

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

// /**
// * @openapi
// * /courses:
// *   get:
// *     description: Ruta raíz que responde con el listado de productos.
// *     responses:
// *       200:
// *         description: Retornará los productos de la base de datos.
// */

coursesRoute.get('/', requireAuth, getCourses);

coursesRoute.get('/:id', requireAuth, getCourse);

coursesRoute.post('/', requireAuth, addCourse);

coursesRoute.put('/:id', requireAuth, updateCourse);

coursesRoute.delete('/:id', requireAuth, deleteCourse);

module.exports = coursesRoute;