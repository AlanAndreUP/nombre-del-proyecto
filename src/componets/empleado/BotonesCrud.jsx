import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

function App() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showSolicitarModal, setShowSolicitarModal] = useState(false);
  const [showEnviarModal, setShowEnviarModal] = useState(false);
  const [solicitudData, setSolicitudData] = useState({
    IDSucursalOrigen: 0,
    IDSucursalDestino: 0,
    IDProducto: 0,
    CantidadSolicitada: 0,
    FechaSolicitud: '',
    Estado: 'PEDIDO'
  });
  const [envioData, setEnvioData] = useState({
    IDSolicitud: 0,
    CantidadEnviada: 0,
    FechaEnvio: null,
    Estado: null
  });

  const handleCambiar = () => {
    navigate(`/Realizar/${userId}`);
  };

  const handleSolicitarModalShow = () => {
    setShowSolicitarModal(true);
  };

  const handleSolicitarModalClose = () => {
    setShowSolicitarModal(false);
  };

  const handleEnviarModalShow = () => {
    setShowEnviarModal(true);
  };

  const handleEnviarModalClose = () => {
    setShowEnviarModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSolicitudData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSolicitar = () => {
    const solicitud = {
      IDSucursalOrigen: solicitudData.IDSucursalOrigen,
      IDSucursalDestino: solicitudData.IDSucursalDestino,
      IDProducto: solicitudData.IDProducto,
      CantidadSolicitada: solicitudData.CantidadSolicitada,
      FechaSolicitud: solicitudData.FechaSolicitud,
      Estado: solicitudData.Estado
    };

    fetch('http://alansanchez12-001-site1.htempurl.com/api/SolicitudEnvioProductos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(solicitud)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Solicitud enviada:', data);
        handleSolicitarModalClose();
      })
      .catch(error => {
        console.error('Error al enviar la solicitud:', error);
      });
  };

  const handleEnviar = () => {
    const envio = {
      IDSolicitud: envioData.IDSolicitud,
      CantidadEnviada: envioData.CantidadEnviada,
      FechaEnvio: envioData.FechaEnvio,
      Estado: envioData.Estado
    };

    fetch(`http://alansanchez12-001-site1.htempurl.com/api/SolicitudEnvioProductos/${envioData.IDSolicitud}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(envio)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Productos enviados:', data);
        handleEnviarModalClose();
      })
      .catch(error => {
        console.error('Error al enviar los productos:', error);
      });
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={12} lg={12} className='text-center m-3'>
          <Button onClick={handleCambiar} className='btn btn-success btn-lg text-center' block>
            Realizar Venta
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={6} md={6} lg={6} className='text-center'>
          <Button variant="primary" className='btn-lg' block onClick={handleSolicitarModalShow}>
            Solicitar
          </Button>
          <Modal show={showSolicitarModal} onHide={handleSolicitarModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Solicitar productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="sucursalOrigen">Sucursal de origen:</label>
                <input
                  id="sucursalOrigen"
                  type="number"
                  className="form-control"
                  name="IDSucursalOrigen"
                  value={solicitudData.IDSucursalOrigen}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sucursalDestino">Sucursal de destino:</label>
                <input
                  id="sucursalDestino"
                  type="number"
                  className="form-control"
                  name="IDSucursalDestino"
                  value={solicitudData.IDSucursalDestino}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="producto">Producto:</label>
                <input
                  id="producto"
                  type="number"
                  className="form-control"
                  name="IDProducto"
                  value={solicitudData.IDProducto}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cantidadSolicitada">Cantidad solicitada:</label>
                <input
                  id="cantidadSolicitada"
                  type="number"
                  className="form-control"
                  name="CantidadSolicitada"
                  value={solicitudData.CantidadSolicitada}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaSolicitud">Fecha de solicitud:</label>
                <input
                  id="fechaSolicitud"
                  type="date"
                  className="form-control"
                  name="FechaSolicitud"
                  value={solicitudData.FechaSolicitud}
                  onChange={handleInputChange}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSolicitarModalClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSolicitar}>
                Enviar solicitud
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col xs={6} md={6} lg={6} className='text-center'>
          <Button variant="secondary" className='btn-lg' block onClick={handleEnviarModalShow}>
            Enviar
          </Button>
          <Modal show={showEnviarModal} onHide={handleEnviarModalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enviar productos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="solicitudID">ID de la solicitud:</label>
                <input
                  id="solicitudID"
                  type="number"
                  className="form-control"
                  name="IDSolicitud"
                  value={envioData.IDSolicitud}
                  onChange={(e) => setEnvioData({ ...envioData, IDSolicitud: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="cantidadEnviada">Cantidad enviada:</label>
                <input
                  id="cantidadEnviada"
                  type="number"
                  className="form-control"
                  name="CantidadEnviada"
                  value={envioData.CantidadEnviada}
                  onChange={(e) => setEnvioData({ ...envioData, CantidadEnviada: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fechaEnvio">Fecha de envío:</label>
                <input
                  id="fechaEnvio"
                  type="date"
                  className="form-control"
                  name="FechaEnvio"
                  value={envioData.FechaEnvio}
                  onChange={(e) => setEnvioData({ ...envioData, FechaEnvio: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="estadoEnvio">Estado:</label>
                <input
                  id="estadoEnvio"
                  type="text"
                  className="form-control"
                  name="Estado"
                  value={envioData.Estado}
                  onChange={(e) => setEnvioData({ ...envioData, Estado: e.target.value })}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEnviarModalClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleEnviar}>
                Enviar productos
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
