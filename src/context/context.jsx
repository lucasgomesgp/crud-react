import { useEffect, useState } from "react";
import { useContext, createContext } from "react";
import { getUsers } from "../database/consumer";

export const UsersContext = createContext([]);

export const UserProvider = (props) => {
    const [allUsers, setAllUsers] = useState([]);

    async function handleGetAllUsers(){
        const response = await getUsers();
        setAllUsers(response.data);
    }
    useEffect(() =>{
        handleGetAllUsers();
    },[]);
    return (
        <UsersContext.Provider value={{ allUsers, setAllUsers} }>
            {props.children}
        </UsersContext.Provider>
    );
};

export function useUsers() {
    return useContext(UsersContext);
}