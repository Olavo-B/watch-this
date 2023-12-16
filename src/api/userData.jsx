import axios from "axios";

/**
 * Fetches the list of users.
 * @returns {Promise<Array>} The list of users.
 */
export async function fetchUserList(){
    try {
        const response = await axios.get('http://localhost:3333/users');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Fetches a user by ID.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Object>} The user object.
 */
export async function fetchUser(id){
    try {
        const response = await axios.get(`http://localhost:3333/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Fetches the catalog of a user.
 * @param {number} id - The ID of the user.
 * @returns {Promise<Array>} The catalog of the user.
 */
export async function fetchCatalog(id){
    try {
        const response = await axios.get(`http://localhost:3333/users/${id}/catalog`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Creates a new user.
 * @param {Object} user - The user object to be created.
 * @returns {Promise<Object>} The created user object.
 */
export async function createUser(user){
    try {
        const response = await axios.put('http://localhost:3333/users', user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Updates an existing user.
 * @param {Object} user - The user object to be updated.
 * @returns {Promise<Object>} The updated user object.
 */
export async function updateUser(user){
    try {
        const response = await axios.post(`http://localhost:3333/users/${user.id}`, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Deletes a user by ID.
 * @param {number} id - The ID of the user to be deleted.
 * @returns {Promise<Object>} The deleted user object.
 */
export async function deleteUser(id){
    try {
        const response = await axios.delete(`http://localhost:3333/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteAnime(id, anime){
    try {
        const response = await axios.delete(`http://localhost:3333/users/${id}/catalog`, {
            data: anime, // or params: anime or other configuration based on your API
          });
          
        return response.status;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Handles user login.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} The user object after successful login.
 */
export async function handleUserLogin(email, password){
    try {
        const response = await axios.post('http://localhost:3333/users/login', {email, password});
        return response.data;
    } catch (error) {
        console.error(error);
    }
}