import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import { getUser, putUser } from "../../database/consumer";

export default function FormEdit() {
    const [user, setUser] = useState({ id: "", name: "", weight: "", age: "", city: "" });
    const { id } = useParams();
    const history = useHistory();

    async function searchUser() {
        try {
            const userCurrent = await getUser(id);
            setUser(userCurrent.data);
        } catch (error) {
            toast.error("Ocorreu um erro ao buscar o usuário!", {position: toast.POSITION.TOP_R});
        }
    }
    async function handleUpdate(event) {
        event.preventDefault();
        try{
            await putUser(user, user.id);
            history.push("/");
            toast.success("Usuário atualizado com sucesso!", {position: toast.POSITION.TOP_R});
        }catch(error){
            toast.error("Ocorreu um erro ao atualizar as informações do usuário!", {position: toast.POSITION.TOP_R});
        }

    }
    function handleChange(event) {
        if (event.target.name === "name") {
            setUser({
                ...user,
                name: event.target.value
            });
        } else if (event.target.name === "weight") {
            setUser({
                ...user,
                weight: event.target.value
            });
        }
        else if (event.target.name === "age") {
            setUser({
                ...user,
                age: event.target.value
            });
        }
        else {
            setUser({
                ...user,
                city: event.target.value
            });
        }
    }
    useEffect(() => {
        searchUser();
    },[]);

    return (
        <>  
            <form onSubmit={handleUpdate} style={{ textAlign: "center", marginTop: "4rem" }}>
                <h1>Edit user</h1>
                <Box sx={{ display: "flex", flexDirection: "column", width: 500, gap: "0.8rem", marginTop: "1rem", marginLeft: "24rem" }}>
                    <TextField id="id" disabled onChange={handleChange} value={user.id} sx={{ display: "none" }} name="id" />
                    <TextField id="name" onChange={handleChange} value={user.name} name="name" />
                    <FormControl variant="standard">
                        <OutlinedInput id="weight" onChange={handleChange} value={user.weight} name="weight"
                            endAdornment={
                                <InputAdornment position="end">kg</InputAdornment>
                            }
                            inputProps={{ "aria-label": "weight" }}
                        />
                        <FormHelperText id="text-weight">Weight</FormHelperText>
                    </FormControl>
                    <TextField id="age" onChange={handleChange} value={user.age} name="age" />
                    <TextField id="city" onChange={handleChange} value={user.city} name="city" />
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "4rem" }}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="error" endIcon={<CancelIcon />} sx={{ padding: "1rem" }}>
                                Cancel
                            </Button>
                        </Link>
                        <Button variant="contained" type="submit" color="success" endIcon={<SendIcon />} sx={{ padding: "1rem" }}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </form>
        </>
    );
}