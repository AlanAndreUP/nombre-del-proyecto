import React from 'react';
import Nav from './Navbar';
import Tabla from './TablaProductos';
import Ventas from './TablaVenta';
import '../css/Login.css';
import Notifcaciones from './Notificaciones';
import Crud from './BotonesCrud'
const Menu = () => {
  return (
    <div className="container-fluid contsfondo">
      <div className="row">
        <div className="col-md-1 col-sm-2 pl-0">
          <Nav />

        </div>
        <div className="col-md-5 col-sm-4 mr-3 mt-2">
        <Tabla></Tabla>
        <div className="col-md-10 col-sm-5 m-3">
          <Crud></Crud>
          </div>
        </div>
        <div className="col-md-5 col-sm-5 m-3">
         <Ventas></Ventas>
          <div className="col-md-10 col-sm-5 m-3">
         <Notifcaciones></Notifcaciones>
        </div>
      
        </div>
       
      </div>
    </div>
  );
};

export default Menu;
