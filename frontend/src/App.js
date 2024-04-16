
import './App.css';
import { Outlet } from "react-router-dom"
import {SlideBar} from './components/index.ts'
function App() {
  return (
    <main>
      <Outlet/>
      <SlideBar/>
    </main>
  );
}

export default App;
