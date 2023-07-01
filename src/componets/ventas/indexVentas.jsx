import React from 'react';
import Nav from '../Nav';
import Grafica from './SalesChart'

const Menu = () => {
  return (
    <div className="container-fluid contsfondo">
      <div className="row">
        <div className="col-md-1 col-sm-2 pl-0">
          <Nav />
        </div>
        <div className="col-md-5 col-sm-4 mr-3">
          <Grafica />
        </div>
    
        </div>
       
      </div>
    
  );
};

export default Menu;
