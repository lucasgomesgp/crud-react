import { useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { deleteUser, getUsers } from "../../database/consumer";
import { useUsers } from "../../context/context";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function BoxUsers() {
    const { allUsers, setAllUsers } = useUsers();
    const history = useHistory();

    async function handleGetItems() {
        try {
            const response = await getUsers();
            setAllUsers(response.data);
            toast.success("Usuários buscados com sucesso!", {position: toast.POSITION.TOP_RIGHT, autoClose: 1000});
        } catch (error) {
            toast.error("Erro ao buscar usuários!", {position: toast.POSITION.TOP_RIGHT});
        }
    }
    
    async function handleEditUser(id) {
        history.push(`/user/${id}`);
    }

    async function handleDelete(id) {
        try {
            await deleteUser(id);
            handleGetItems();
        } catch (error) {
            toast.error("Erro ao deletar usuário!", {position: toast.POSITION.TOP_RIGHT});
        }
    }

    useEffect(() => {
        handleGetItems();
    }, []);
    return (
        <>
            <Box className="box"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    marginTop: "4rem"
                }}>
                <h2 className="list-users">Search all users</h2>
                <Button
                    variant="contained"
                    type="submit" color="success"
                    endIcon=
                    {
                        <SearchIcon
                            sx={{ height: "2rem", width: "2rem" }}
                        />
                    }
                    sx={{ height: "3.5rem" }}
                    onClick={handleGetItems}
                />
            </Box>
            <TableContainer>
                <Table sx={{ marginTop: "1rem" }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ fontSize: "1.2rem" }}>Id</TableCell>
                            <TableCell align="center" sx={{ fontSize: "1.2rem" }}>Name</TableCell>
                            <TableCell align="center" sx={{ fontSize: "1.2rem" }}>Weight</TableCell>
                            <TableCell align="center" sx={{ fontSize: "1.2rem" }}>Age</TableCell>
                            <TableCell align="center" sx={{ fontSize: "1.2rem" }}>City</TableCell>
                            <TableCell align="center" sx={{ fontSize: "1.2rem" }}>Operations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allUsers && allUsers.map((currentUser) => (
                            <TableRow key={currentUser.id}>
                                <TableCell align="center">{currentUser.id}</TableCell>
                                <TableCell align="center">{currentUser.name}</TableCell>
                                <TableCell align="center">{currentUser.weight}</TableCell>
                                <TableCell align="center">{currentUser.age}</TableCell>
                                <TableCell align="center">{currentUser.city}</TableCell>
                                <TableCell align="center">
                                    <Button endIcon={<DeleteIcon onClick={() => handleDelete(currentUser.id)} color="error" sx={{ width: "2rem", height: "1.8rem" }} />} />
                                    <Button endIcon={<EditIcon onClick={() => handleEditUser(currentUser.id)} sx={{ width: "2rem", height: "1.8rem" }} />} />
                                </TableCell>
                            </TableRow>
                        ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}