
import './App.css';
import { AmbientesRegistroPage} from './pages/ambientes/AmbientesRegistroPage.tsx';
import { Bienvenida} from './pages/Inicio/Bienvenida.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Bienvenida/>}/>
      <Route path='/registroAmbiente' element= {<AmbientesRegistroPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
