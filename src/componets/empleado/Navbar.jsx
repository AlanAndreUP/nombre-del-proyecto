
import '../css/Navbar.css';
import Flecha from '../../img/Flecha7.svg'
import ELlipse from '../../img/Ellipse 1.svg'
import Vector from '../../img/Vector.svg'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { userId } = useParams(); // Obtener el parámetro userId de la URL
  const [userName, setUserName] = useState('');
  console.log(userId);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const url = `http://alansanchez12-001-site1.htempurl.com/api/Empleadoes/${userId}`;
        const response = await fetch(url);

        const data = await response.json();
        //console.log(data.nombre)
        const name = data.nombre;
        if (response.ok) {

          // console.log(name) // Suponiendo que el nombre del usuario está en el campo 'name' del objeto de respuesta
          setUserName(name);
        } else {
          console.log('Error al obtener el nombre del usuario');
        }
      } catch (error) {
        console.log('Error en la solicitud');
      }
    };

    fetchUserName();
  }, [userId]);
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`navbar-container `}>
      <div className="navbar-header">

      </div>

      <div className="navbar-menu">
     
       

       
      </div>
      <div className="navbar-user" onClick={handleExpand}>
        <img src={ELlipse} alt="User" className="navbar-user-image" />
       
      </div>
    </div>
  );
};

export default Navbar;
