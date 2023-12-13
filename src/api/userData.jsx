import axios from "axios";

export async function fetchUserList(){
    try {
        const response = await axios.get('http://localhost:3333/users');
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export async function fetchUser(id){
    try {
        const response = await axios.get(`http://localhost:3333/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function createUser(user){
    try {
        const response = await axios.put('http://localhost:3333/users', user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateUser(user){
    try {
        const response = await axios.post(`http://localhost:3333/users/${user.id}`, user);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}