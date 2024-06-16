import { Button } from "@nextui-org/react";
import "./App.css";

function App() {
  const login = () => {
    console.log("Login");
    window.location.href = "/login";
  };

  return (
    <>
      <div className="fondo">Esta Es la panta Principal</div>
      <Button className="bg-primary text-2xl text-white mx-10" onClick={login}>
        {" "}
        Iniciar Sesion{" "}
      </Button>
    </>
  );
}

export default App;
