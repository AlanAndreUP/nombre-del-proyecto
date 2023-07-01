import React from 'react';
import Nav from './Nav';
import ProductTable from './Mapita';
import Calendario from './Mapa'

//import './css/Login.css';
const Tareas = () => {
    return (
        <div className="container-fluid ">
            <div className="row">
                <h1 className='text-white'>Tareas Pendientes</h1>
                <div class="card" style={{width:" 18rem;"}}>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Entrega Taquera </li>
                        <li class="list-group-item">Produccion cazo</li>
                        <li class="list-group-item">Creacion Refrigerador</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Tareas;
