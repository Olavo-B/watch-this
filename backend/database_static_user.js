import { randomUUID } from 'crypto';


/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} password
 * @property {Array} catalog
 */
export class DatabaseMemory  {
       
    #users = new Map()

    list() {
        return Array.from(this.#users.entries()).map((userArray) => {
            const id = userArray[0];
            const data = userArray[1];

            return { id,...data};
        });
    }

    get(id) {
        return this.#users.get(id);
    }

    getUser(email) {
        const users = this.list();

        return users.find((user) => {
            return user.email === email;
        });
    }

    getCatalog(id) {
        return this.#users.get(id).catalog;
    }

    create(user) {
        const id = randomUUID();

        this.#users.set(id, user);
    }

    update(id, user) {
        this.#users.set(id, user);
    }

    updateCatalog(id, anime) {
        const user = this.#users.get(id);

        console.log(user);

        user.catalog.push(anime);

        this.#users.set(id, user);
    }

    delete(id) {
        this.#users.delete(id);
    }

    deleteAnime(id, anime) {
        const user = this.#users.get(id);

        user.catalog = user.catalog.filter((animeItem) => {
            return animeItem !== anime;
        });

        this.#users.set(id, user);
    }
}