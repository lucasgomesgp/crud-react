import { ToastContainer } from "react-toastify";
import Form from "../components/Form";
import BoxUsers from "../components/BoxUsers";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
    return (
        <>
            <ToastContainer theme="colored"/>
            <Form />
            <BoxUsers />
        </>
    );
}