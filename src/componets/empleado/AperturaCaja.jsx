import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const Apertura = () => {
  const [fechaCreacion, setFechaCreacion] = useState('');
  const [idEmpleado, setIdEmpleado] = useState('');
  const [idSucursal, setIdSucursal] = useState('');
  const [turno, setTurno] = useState('');
  const [cantB1000, setCantB1000] = useState('');
  const [cantB500, setCantB500] = useState('');
  const [cantB200, setCantB200] = useState('');
  const [cantB100, setCantB100] = useState('');
  const [cantB50, setCantB50] = useState('');
  const [cantB20, setCantB20] = useState('');
  const [mon10, setMon10] = useState('');
  const [mon5, setMon5] = useState('');
  const [mon2, setMon2] = useState('');
  const [mon1, setMon1] = useState('');
  const [mon5OC, setMon5OC] = useState('');
  const [montoTotal, setMontoTotal] = useState('');
  const { userId } = useParams();
  const [idApertura, setUserName] = useState('');
  const [OPEN, SetOpen] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`http://alansanchez12-001-site1.htempurl.com/api/Empleadoes/${userId}`);
        const userData = await userResponse.json();

        if (userResponse.ok) {
          const userName = userData.nombre;
          setIdEmpleado(userId);
          setTurno(userData.turno);
     
        } else {
          console.log('Error al obtener los datos del usuario');
        }

        const sucursalResponse = await fetch('http://alansanchez12-001-site1.htempurl.com/api/Sucursals');
        const sucursalData = await sucursalResponse.json();

        if (sucursalResponse.ok && sucursalData.length > 0) {
          const sucursalId = sucursalData[0].id; // Suponiendo que obtienes el ID de la primera sucursal disponible
          setIdSucursal(sucursalId);
        } else {
          console.log('Error al obtener los datos de la sucursal');
        }

        const currentDateTime = new Date().toISOString();
        setFechaCreacion(currentDateTime);
      } catch (error) {
        console.log('Error en la solicitud:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    // Calcular el monto total cada vez que cambie uno de los valores de los campos de billetes o monedas
    const calculateTotalAmount = () => {
        const parsedCantB1000 = parseInt(cantB1000);
        const parsedCantB500 = parseInt(cantB500);
        const parsedCantB200 = parseInt(cantB200);
        const parsedCantB100 = parseInt(cantB100);
        const parsedCantB50 = parseInt(cantB50);
        const parsedCantB20 = parseInt(cantB20);
        const parsedMon10 = parseInt(mon10);
        const parsedMon5 = parseInt(mon5);
        const parsedMon2 = parseInt(mon2);
        const parsedMon1 = parseInt(mon1);
        const parsedMon5OC = parseFloat(mon5OC);
      
        const totalAmount =
          (isNaN(parsedCantB1000) ? 0 : parsedCantB1000) * 1000 +
          (isNaN(parsedCantB500) ? 0 : parsedCantB500) * 500 +
          (isNaN(parsedCantB200) ? 0 : parsedCantB200) * 200 +
          (isNaN(parsedCantB100) ? 0 : parsedCantB100) * 100 +
          (isNaN(parsedCantB50) ? 0 : parsedCantB50) * 50 +
          (isNaN(parsedCantB20) ? 0 : parsedCantB20) * 20 +
          (isNaN(parsedMon10) ? 0 : parsedMon10) * 10 +
          (isNaN(parsedMon5) ? 0 : parsedMon5) * 5 +
          (isNaN(parsedMon2) ? 0 : parsedMon2) * 2 +
          (isNaN(parsedMon1) ? 0 : parsedMon1) * 1 +
          (isNaN(parsedMon5OC) ? 0 : parsedMon5OC) * 0.5;
      
        setMontoTotal(totalAmount);
        console.log(totalAmount);
      };
      
    calculateTotalAmount();
  }, [cantB1000, cantB500, cantB200, cantB100, cantB50, cantB20, mon10, mon5, mon2, mon1, mon5OC]);

  const handleBillInputChange = (e, setterFunction) => {
    const value = e.target.value;
    const parsedValue = isNaN(value) ? 0 : parseInt(value);

    setterFunction(parsedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      id:0,
     fechadeCreacion: fechaCreacion,
      idEmpleado,
      idSucursal,
      turno:1,
      cantB1000,
      cantB500,
      cantB200,
      cantB100,
      cantB50,
      cantB20,
      mon10,
      mon5,
      mon2,
      mon1,
      mon5OC,
      montoTotal: parseFloat(montoTotal),
    };

 
    try {
      console.log(formData);
      const response = await fetch('http://alansanchez12-001-site1.htempurl.com/api/AperturaCajas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    
      if (response.ok) {
        Swal.fire('Apertura de caja enviada con éxito');
        SetOpen(true);
        console.log(response);
      } else {
        // En caso de error HTTP, mostramos el mensaje del servidor si está disponible.
        // De lo contrario, mostramos un mensaje genérico.
       
        Swal.fire(`Error al enviar la apertura de caja: `);
      }
    } catch (error) {
      Swal.fire(`Error en la solicitud: ${error.message}`);
    }
    if(OPEN){
  return <Navigate to={`/MenuEmpleado`} replace />;
    }
  
  }
    

  return (
    <div className="container-fluid contsfondo">
      <Row>
        <h1 className='text-center text-white'>Apertura de caja</h1>
        <Col xs={12} md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cantB1000">
              <Form.Label className="text-white">Cantidad de Billetes de $1000</Form.Label>
              <Form.Control
                type="text"
                value={cantB1000}
                onChange={(e) => handleBillInputChange(e, setCantB1000)}
              />
            </Form.Group>
            <Form.Group controlId="cantB500">
              <Form.Label className="text-white">Cantidad de Billetes de $500</Form.Label>
              <Form.Control
                type="text"
                value={cantB500}
                onChange={(e) => handleBillInputChange(e, setCantB500)}
              />
            </Form.Group>
            <Form.Group controlId="cantB200">
              <Form.Label className="text-white">Cantidad de Billetes de $200</Form.Label>
              <Form.Control
                type="text"
                value={cantB200}
                onChange={(e) => handleBillInputChange(e, setCantB200)}
              />
            </Form.Group>
            <Form.Group controlId="cantB100">
              <Form.Label className="text-white">Cantidad de Billetes de $100</Form.Label>
              <Form.Control
                type="text"
                value={cantB100}
                onChange={(e) => handleBillInputChange(e, setCantB100)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cantB50">
              <Form.Label className="text-white">Cantidad de Billetes de $50</Form.Label>
              <Form.Control
                type="text"
                value={cantB50}
                onChange={(e) => handleBillInputChange(e, setCantB50)}
              />
            </Form.Group>
            <Form.Group controlId="cantB20">
              <Form.Label className="text-white">Cantidad de Billetes de $20</Form.Label>
              <Form.Control
                type="text"
                value={cantB20}
                onChange={(e) => handleBillInputChange(e, setCantB20)}
              />
            </Form.Group>
            <Form.Group controlId="mon10">
              <Form.Label className="text-white">Cantidad de Monedas de $10</Form.Label>
              <Form.Control
                type="text"
                value={mon10}
                onChange={(e) => handleBillInputChange(e, setMon10)}
              />
            </Form.Group>
            <Form.Group controlId="mon5">
              <Form.Label className="text-white">Cantidad de Monedas de $5</Form.Label>
              <Form.Control
                type="text"
                value={mon5}
                onChange={(e) => handleBillInputChange(e, setMon5)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} md={4}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="mon2">
              <Form.Label className="text-white">Cantidad de Monedas de $2</Form.Label>
              <Form.Control
                type="text"
                value={mon2}
                onChange={(e) => handleBillInputChange(e, setMon2)}
              />
            </Form.Group>
            <Form.Group controlId="mon1">
              <Form.Label className="text-white">Cantidad de Monedas de $1</Form.Label>
              <Form.Control
                type="text"
                value={mon1}
                onChange={(e) => handleBillInputChange(e, setMon1)}
              />
            </Form.Group>
            <Form.Group controlId="mon5OC">
              <Form.Label className="text-white">Cantidad de Monedas de $0.5</Form.Label>
              <Form.Control
                type="text"
                value={mon5OC}
                onChange={(e) => handleBillInputChange(e, setMon5OC)}
              />
            </Form.Group>
            <Form.Group controlId="montoTotal">
              <Form.Label className="text-white">Monto Total</Form.Label>
              <Form.Control type="text" value={montoTotal.toString()} readOnly />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Button variant="success" type="submit" className='mt-2'onClick={handleSubmit}>
        Guardar
      </Button>
    </div>
  );
};

export default Apertura;
