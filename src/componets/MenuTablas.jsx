import React from "react";
import Empleados from "../../src/img/empleados.png";
import Producto from "../../src/img/producto.png";
import Secciones from "../../src/img/secciones.png";
import Tiendas from "../../src/img/tiendas.png";
import Bodegas from "../../src/img/Bodegas.png";
import "../css/MenuTablas.css";
import { Button } from "reactstrap";
import {useNavigate} from 'react-router-dom'
import { useSpring, animated } from 'react-spring';



const MenuTablas = () => {
const navigate=useNavigate();
const props = useSpring({ opacity: 1, from: { opacity: 0 } });

  const handleClick = (key) => {
      navigate('/Productos')
  }
  const handleClick2 = (key) => {
    navigate('/Empleados')
}
const handleClick3 = (key) => {
  navigate('/Productos')
}
const handleClick4 = (key) => {
  navigate('/Productos')
}

  return (
    <div className="menu-tablas-container">
      <br />
      <br />
      <center style={{ color: "white", fontFamily: "Poppins, sans-serif" }}>
        <h1>Menu Tablas</h1>
        <h2>Ingrese la tabla que quiera visualizar</h2>
      </center>

      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          
          <animated.img
        src={Empleados}
        style={props}
      />
          <Button color="warning"onClick={handleClick2}>Tabla Empleados</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           <animated.img
        src={Producto}
       
        style={props}
      />
          <Button color="warning" onClick={handleClick}>Tabla Productos</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           <animated.img
        src={Secciones}
       
        style={props}
      />
          <Button color="warning">Tabla Secciones</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <animated.img
        src={Tiendas}
       
        style={props}
      />
          <Button color="warning">Tabla de Tiendas</Button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
           <animated.img
        src={Bodegas}
       
        style={props}
      />
          <Button color="warning">Tabla de Bodegas</Button>
        </div>
      </div>
    </div>
  );
};

export default MenuTablas;
