import axios from "axios";
import { toast } from "react-toastify";
const BASE_URL = "http://localhost:3001/users";

export async function getUsers() {
    const users = await axios.get(BASE_URL);
    return users;
}

export async function getUser(id) {
    const user = await axios.get(`${BASE_URL}/${id}`);
    return user;
}

export async function postUser(user) {
    const postUser = await axios.post(BASE_URL, {
        ...user,
    });
    return postUser;
}

export async function putUser(user, id){
    await axios.put(`${BASE_URL}/${id}`, {...user});
}
export async function deleteUser(id){
    axios.delete(`${BASE_URL}/${id}`);
    toast.error("Usuário deletado com sucesso!",{position: toast.POSITION.TOP_RIGHT});
}