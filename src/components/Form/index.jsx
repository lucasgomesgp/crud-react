import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Button, FormControl, FormHelperText, InputAdornment, OutlinedInput, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { postUser } from "../../database/consumer";
import "./index.css";

export default function Form() {
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        const { name, weight, age, city } = event.target;
        const user = {
            id: Math.floor(Math.random() * 1000),
            name: name.value,
            weight: weight.value,
            age: age.value,
            city: city.value
        }
        
        if (name.value && weight.value && age.value && city.value) {
            try {
                postUser(user);
                name.value = "";
                weight.value = "";
                age.value = "";
                city.value = "";
                // toast.success("Usuário cadastrado com sucesso!", {position: toast.POSITION.TOP_RIGHT, autoClose: 8000});
                history.go();
            }
            catch(error){
                console.error(error);
            }
        } else {
            toast.error("Campos obrigatórios!", {position: toast.POSITION.TOP_RIGHT});
        }
    }
    return (
        <>
            <h1 className="title">Form of CRUD with React</h1>
            <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", justifyContent: "center", gap: "0.8rem", marginTop: "1rem" }}>
                    <TextField label="Name" id="name" name="name" sx={{ width: "28%" }} />
                    <FormControl variant="standard">
                        <OutlinedInput id="weight" name="weight"
                            endAdornment={
                                <InputAdornment position="end">kg</InputAdornment>
                            }
                            inputProps={{ "aria-label": "weight" }}
                        />
                        <FormHelperText id="text-weight">Weight</FormHelperText>
                    </FormControl>
                    <TextField label="Age" id="age" name="age"/>
                    <TextField label="City" id="city" name="city" />
                    <Button variant="contained" type="submit" color="success" endIcon={<SendIcon />} sx={{ height: "3.5rem", width: "10rem" }}>
                        Send
                    </Button>
                </Box>
            </form>
        </>
    );
}