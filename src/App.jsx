import { BrowserRouter, Route } from "react-router-dom";
import FormEdit from "./components/FormEdit";
import { UserProvider } from "./context/context";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Route path="/" exact component={Home} />
          <Route path="/user/:id" component={FormEdit} />
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
