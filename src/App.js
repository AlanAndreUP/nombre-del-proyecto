import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Menu from './componets/Menu';
import Ventas from './componets/ventas/indexVentas';
import Prueba from './componets/Prueba'
import Login from './componets/empleado/index';
import Apertura from './componets/empleado/AperturaCaja';
import MenuEmpleado from './componets/empleado/MenuEmpleado';
import Realizar from './componets/empleado/RealizarVenta';
import Tablas from './componets/MenuTablas';
import Empleado from './componets/Empleados';
import Productos from './componets/Productoes';
import Categorias from './componets/Secciones';
import Tiendas from './componets/Sucursales';
import Bodegas from './componets/Bodegas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prueba />} />
        <Route path="/Menu/:userId" element={<Menu />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/Tablas" element={<Tablas />} />
        <Route path="/Empleado" element={<Empleado />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Categorias" element={<Categorias />} />
        <Route path="/Tiendas" element={<Tiendas />} />
        <Route path="/Bodegas" element={<Bodegas />} />
        <Route path="/LoginEmpleado" element={<Login/>}/>
        <Route path="/Apertura/:userId" element={<Apertura/>}/>
        <Route path="/MenuEmpleado" element={<MenuEmpleado/>}/>
        <Route path="/Realizar" element={<Realizar/>}/>
      </Routes>
    </Router>
  );
}

export default App;
