import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componets/Login';
import Menu from './componets/Menu';
import Mapa from './componets/Mapa';
import Prueba from './componets/Prueba'
import FuturoAgua from './componets/FuturoAgua';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Prueba />} />
        <Route path="/Menu/:userId" element={<Menu />} />
        <Route path="/Mapa" element={<Mapa />} />
        <Route path="/Futuro" element={<FuturoAgua/>}/>
      </Routes>
    </Router>
  );
}

export default App;
