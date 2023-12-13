import { fastify } from 'fastify'; 
import { DatabaseMemory } from './database_static_user.js';

const server   = fastify();
const database = new DatabaseMemory()

server.get('/users', (request, reply) => {
    const users = database.list();

    return reply.send(users);
});

server.get('/users/:id', (request, reply) => {
    const { id } = request.params;

    const user = database.getCatalog(id);

    return reply.send(user);
});

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

server.post('/users/:id/catalog', (request, reply) => {
    const { id } = request.params;
    const anime  = request.body;

    database.updateCatalog(id, anime["catalog"]);

    return reply.status(204).send();
});

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

server.delete('/users/:id', (request, reply) => {
    const { id } = request.params;

    database.delete(id);

    return reply.status(204).send();
});

server.delete('/users/:id/catalog', (request, reply) => {
    const { id } = request.params;
    const { anime }   = request.body;

    database.deleteAnime(id, anime["catalog"]);

    return reply.status(204).send();
});



server.listen({
    port: 3333,
});