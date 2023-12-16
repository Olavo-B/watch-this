import { randomUUID } from 'crypto';
import { sql } from './db.js';


/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} hash
 * @property {Array} catalog
 */
export class DatabasePostgres  {

    async list()  {

        const users = await sql`SELECT * FROM users`;


        return users;

    }

    async get(id) {

        const user = await sql`SELECT * FROM users WHERE id = ${id}`;

        return user;
      
    }

    async getUser(email) {
        
        const user = sql`SELECT * FROM users WHERE email = ${email}`;

        return user;
    }

    getCatalog(id) {
            
            const catalog = sql`SELECT catalog FROM users WHERE id = ${id}`;

            

    
            return catalog;
    }

    async create(user) {

        const id = randomUUID();

        await sql`INSERT INTO users (id, email, hash, catalog) VALUES (${id}, ${user.email}, ${user.hash}, ${user.catalog})`;
  
    }
    

    async update(id, user) {
        
        await sql`UPDATE users SET hash = ${user.hash} WHERE id = ${id}`;

    }

    async updateCatalog(id, anime) {

        const user = await sql`SELECT * FROM users WHERE id = ${id}`;
            
        user[0].catalog.push(anime);

        await sql`UPDATE users SET catalog = ${user[0].catalog} WHERE id = ${id}`;

    }

    async delete(id) {

        await sql`DELETE FROM users WHERE id = ${id}`;

    }

    async deleteAnime(id, anime) {

        const user = await sql`SELECT * FROM users WHERE id = ${id}`;


        user[0].catalog = user[0].catalog.filter((animeItem) => {
            return animeItem !== anime;
        });

        await sql`UPDATE users SET catalog = ${user[0].catalog} WHERE id = ${id}`;
    }
}