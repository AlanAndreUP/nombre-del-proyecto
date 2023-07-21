import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tareas = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [indiceTarjeta, setIndiceTarjeta] = useState(0);

  useEffect(() => {
    axios.get('http://alansanchez12-001-site1.htempurl.com/api/Pendientes')
      .then(response => {
        const pendientes = response.data;
        axios.get('http://alansanchez12-001-site1.htempurl.com/api/Sucursals')
          .then(response => {
            const sucursales = response.data;
            const notificaciones = pendientes.map(pendiente => {
              const sucursal = sucursales.find(sucursal => sucursal.id === pendiente.idSucursal);
              return {
                id: pendiente.id,
                descripcion: pendiente.descripcion,
                sucursal: sucursal ? sucursal.nombreSucursal : '',
                fecha: pendiente.fechaEntrega
              };
            });
            setNotificaciones(notificaciones);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleNextCard = () => {
    setIndiceTarjeta(prevIndice => prevIndice + 1);
  };

  const handlePrevCard = () => {
    setIndiceTarjeta(prevIndice => prevIndice - 1);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <h1 className='text-white'>Notificaciones</h1>
        <div className="card" style={{ width: "16rem" }}>
          <ul className="list-group list-group-flush">
            {notificaciones.length > 0 && (
              <li className="list-group-item">
                <strong>Descripción:</strong> {notificaciones[indiceTarjeta].descripcion}<br/>
                <strong>Sucursal:</strong> {notificaciones[indiceTarjeta].sucursal}<br/>
                <strong>Fecha:</strong> {notificaciones[indiceTarjeta].fecha}
              </li>
            )}
          </ul>
          {notificaciones.length > 1 && (
            <div className="card-footer">
              <button
                className="btn btn-primary mr-2"
                onClick={handlePrevCard}
                disabled={indiceTarjeta === 0}
              >
                Anterior
              </button>
              <button
                className="btn btn-primary"
                onClick={handleNextCard}
                disabled={indiceTarjeta === notificaciones.length - 1}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tareas;
