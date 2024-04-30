// import { Button } from "@nextui-org/react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="fondo">
        <Outlet />
      </div>
    </>
  );
}

export default App;
