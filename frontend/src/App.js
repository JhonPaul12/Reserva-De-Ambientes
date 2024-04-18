
import './App.css';
import { Outlet } from "react-router-dom"
import {SlideBar} from './components/index.ts'
function App() {
  return (
    <div style={{display: 'flex'}}>
    <main>
      <SlideBar />
    </main>
    <Outlet />
  </div>
  );
}

export default App;
