import React from 'react';
import Nav from './Nav';
import ProductTable from './Mapita';
import Calendario from './Mapa'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/Login.css';
import Tareas from './TareasPendientes';
const Menu = () => {
  return (
    <div className="container-fluid contsfondo">
      <div className="row">
        <div className="col-md-1 col-sm-2 pl-0">
          <Nav />
        </div>
        <div className="col-md-5 col-sm-4 mr-3 mt-2">
          <ProductTable />
        </div>
        <div className="col-md-5 col-sm-5 m-3">
          <Calendario />
          <div className="col-md-10 col-sm-5 m-3">
          <Tareas/>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default Menu;
