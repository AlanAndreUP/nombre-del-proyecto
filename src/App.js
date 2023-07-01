import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './componets/Menu';
import Ventas from './componets/ventas/indexVentas';
import Prueba from './componets/Prueba'
import Login from './componets/empleado/index';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prueba />} />
        <Route path="/Menu/:userId" element={<Menu />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/LoginEmpleado" element={<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
