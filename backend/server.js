/**
 * @fileoverview This file contains the server code for handling user-related requests.
 * It uses the Fastify framework and a memory-based database.
 * The server exposes various endpoints for CRUD operations on user data.
 */

import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { DatabaseMemory } from './database_static_user.js';



const server   = fastify();
const database = new DatabaseMemory()

server.register(fastifyCors, {
    // Configurações do CORS
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  });

/**
 * GET /users
 * Retrieves a list of all users.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Array} - An array of user objects.
 */
server.get('/users', (request, reply) => {
    const users = database.list();

    return reply.send(users);
});

/**
 * GET /users/:id
 * Retrieves a specific user by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The user object.
 */
server.get('/users/:id', (request, reply) => {
    const { id } = request.params;

    const user = database.getCatalog(id);

    return reply.send(user);
});

/**
 * POST /users/:id
 * Updates a user by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The updated user object.
 */
server.post('/users/:id', (request, reply) => {
    const { id } = request.params;
    const {email, password, catalog} = request.body;

    database.update(id, 
        {
            email,
            password,
            catalog,
        });

    return reply.status(204).send();
});

/**
 * POST /users/:id/catalog
 * Updates a user's catalog by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The updated user object.
 */
server.post('/users/:id/catalog', (request, reply) => {
    const { id } = request.params;
    const anime  = request.body;

    database.updateCatalog(id, anime["catalog"]);

    return reply.status(204).send();
});

/**
 * PUT /users
 * Creates a new user.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The created user object.
 */
server.put('/users', (request, reply) => {
    const {email, password, catalog} = request.body;

    database.create(
        {
            email,
            password,
            catalog,
        }
    );

    return reply.status(201).send();
});

/**
 * DELETE /users/:id
 * Deletes a user by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The deleted user object.
 */
server.delete('/users/:id', (request, reply) => {
    const { id } = request.params;

    database.delete(id);

    return reply.status(204).send();
});

/**
 * DELETE /users/:id/catalog
 * Deletes an anime from a user's catalog by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The updated user object.
 */
server.delete('/users/:id/catalog', (request, reply) => {
    const { id } = request.params;
    const { anime }   = request.body;

    database.deleteAnime(id, anime["catalog"]);

    return reply.status(204).send();
});

/**
 * Starts the server and listens on port 3333.
 */

server.listen({
    port: 3333
});

// const start = async () => {
//     try {
//       await server.listen({
//         port: 3333,
//       });
//       console.log(`Servidor rodando em: ${fastify.server.address().port}`);
//     } catch (err) {
//       console.error(err);
//       process.exit(1);
//     }
//   };
  
// start();