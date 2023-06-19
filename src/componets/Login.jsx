import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import Nav from "./Nav";
import Footer from "./Footer";

const Login = () => {
  return (
    <div>
      <Nav></Nav>
      <Container fluid style={{ backgroundColor: '#2e8555', padding: '50px' }}>
        <motion.h1
          style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize:'45px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Cuida el agua
        </motion.h1>
        <motion.p
          style={{ color: 'white', textAlign: 'center', fontSize:'35px'}}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ¿Problemas con el agua? 
        </motion.p>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to={"/MENU"}> 
            <motion.button className="m-4" variant="light">
              Mandar un reporte
            </motion.button>
          </Link>
          <Link to={"/Mapa"}>
            <motion.button className="m-2" variant="light">
              Mapa Interactivo
            </motion.button>
          </Link>
          <Link to={"/Futuro"}>
            <motion.button className="m-4" variant="light">
              Como será el agua en el futuro
            </motion.button>
          </Link>
        </motion.div>
      </Container>

      <Container className="mt-4 text-center">
        <Row>
          <Col>
            <Image src="./11.svg" fluid style={{ width: '200px' }} />
            <h2 style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize:'25px', marginTop:"10px" }}>
              Facil de cuidar
            </h2>
            <p className="mt-3">Un pequeño cambio hace un gran ahorro</p>
          </Col>
          <Col>
            <Image src="./12.svg" fluid style={{ width: '200px' }} />
            <h2 style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize:'25px', marginTop:"10px" }}>
              Enfocate al cuidar al medio Ambiente
            </h2>
            <p className="mt-3">El cambio empieza con un pequeña acción</p>
          </Col>
          <Col>
            <Image src="./13.svg" fluid style={{ width: '200px' }} />
            <h2 style={{ color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize:'25px', marginTop:"10px" }}>
              Ayudate de la tecnologia
            </h2>
            <p className="mt-3">Usa la tecnología a tu favor</p>
          </Col>
        </Row>
      </Container>

      <Footer></Footer>
    </div>
  );
};

export default Login;
