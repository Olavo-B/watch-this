/**
 * @fileoverview This file contains the server code for handling user-related requests.
 * It uses the Fastify framework and a memory-based database.
 * The server exposes various endpoints for CRUD operations on user data.
 */

import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import bcrypt from 'bcrypt';
import { DatabasePostgres } from './database_postgres.js';
import { searchEngine } from './search_engine.js';



const server   = fastify();
const database = new DatabasePostgres()
 

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
server.get('/users', async (request, reply) => {
    const users = await database.list();

    return reply.send(users);
});

/**
 * GET /users/:id
 * Retrieves a user by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The user object.
 */
server.get('/users/:id', async (request, reply) => {
    const { id } = request.params;

    const user = await database.get(id);

    return reply.send(user[0]);
});

/**
 * GET /users/:id
 * Retrieves catalog of a user by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The user object.
 */
server.get('/users/:id/catalog',async (request, reply) => {
    const { id } = request.params;

    const user = await database.getCatalog(id);

    return reply.send(user[0]["catalog"]);
});

/**
 * POST /users/login
 * Do login authentication.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The user object.
 */
server.post('/users/login', async (request, reply) => {
    const { email, password } = request.body;
  
    try {
      const user = await database.getUser(email);
  
  
      if (!user) {
        return reply.status(404).send();
      }
  
      const result = await comparePasswords(password, user[0].hash);
  
      return reply.send(result);
    } catch (error) {
      console.error('Error during login:', error);
      return reply.status(500).send();
    }
  });
  
function comparePasswords(password, hashedPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
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

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            await database.update(id,
                {
                    email,
                    hash,
                    catalog,
                });
        });
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
server.post('/users/:id/catalog', async (request, reply) => {
    const { id } = request.params;
    const anime  = request.body;

    console.log(anime["catalog"]);

    await database.updateCatalog(id, anime["catalog"]);

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

    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
            await database.create(
                {
                    email,
                    hash,
                    catalog,
                });
        });
    });

  

    return reply.status(201).send();
});

/**
 * DELETE /users/:id
 * Deletes a user by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The deleted user object.
 */
server.delete('/users/:id', async (request, reply) => {
    const { id } = request.params;

    await database.delete(id);

    return reply.status(204).send();
});

/**
 * DELETE /users/:id/catalog
 * Deletes an anime from a user's catalog by ID.
 * @param {Object} request - The request object.
 * @param {Object} reply - The reply object.
 * @returns {Object} - The updated user object.
 */
server.delete('/users/:id/catalog', async (request, reply) => {
    const { id } = request.params;
    const anime   = request.body;

    console.log(anime);

    await database.deleteAnime(id, anime["catalog"]);

    return reply.status(204).send();
});

server.get('/recommendations/:anime', async (request, reply) => {
    const { anime } = request.params;

    const result = await searchEngine(anime);
    return reply.send(result);
});

/**
 * Starts the server and listens on port 3333.
 */

server.listen({
    port: 3333,
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