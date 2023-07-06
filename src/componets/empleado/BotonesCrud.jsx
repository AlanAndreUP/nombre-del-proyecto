import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function App() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={12} lg={12} className='text-center m-3'>
        <Link to="/Realizar"   className='btn btn-success btn-lg text-center'block>
        Realizar Venta
            </Link>
        
        </Col>
      </Row>
      <Row>
        <Col xs={6}  md={6} lg={6} className='text-center'>
          <Button variant="primary" className='btn-lg'block>
          Solicitar
          </Button>
        </Col>
        <Col xs={6} md={6} lg={6}  className='text-center'>
          <Button variant="secondary" className='btn-lg'block>
            Enviar
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
