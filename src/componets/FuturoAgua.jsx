import React, { useState } from "react";
import { Container, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import Nav from "./Nav";
import Footer from "./Footer";
import aguaAntesImg from "../img/13.jpg";
import aguaHoyImg from "../img/12.jpg";
import aguaFuturoImg from "../img/11.jpg";
import PasadoAgua from './PasadoAgua';
import { motion } from "framer-motion";

const Agua = () => {
  const [contaminacion, setContaminacion] = useState(0); // Nivel de contaminación

  // Función para aumentar la contaminación
  const aumentarContaminacion = () => {
    if (contaminacion < 100) {
      setContaminacion(contaminacion + 10);
    }
  };

  const disminuirContaminacion = () => {
    if (contaminacion > 0) {
      setContaminacion(contaminacion - 10);
    }
  };

  // Atributos según el nivel de contaminación
  const atributos = [
    {
      nivel: 0,
      descripcion: "Bajos niveles de acidez en el agua",
      riosLimpios: "Ríos limpios y recuperados",
      plantasTratamiento: "Plantas de tratamiento eficientes y en mayor cantidad",
      calidadAgua: "Calidad del agua óptima para el consumo humano",
      cantidadAguaEmpresas: "Uso responsable del agua por parte de las empresas"
    },
    {
      nivel: 50,
      descripcion: "Moderados niveles de acidez en el agua",
      riosLimpios: "Ríos afectados por la contaminación",
      plantasTratamiento: "Plantas de tratamiento en funcionamiento, pero insuficientes",
      calidadAgua: "Calidad del agua comprometida por la contaminación",
      cantidadAguaEmpresas: "Alta cantidad de agua consumida por empresas"
    },
    {
      nivel: 100,
      descripcion: "Altos niveles de acidez en el agua",
      riosLimpios: "Ríos contaminados y sin vida",
      plantasTratamiento: "Plantas de tratamiento insuficientes o fuera de servicio",
      calidadAgua: "Calidad del agua inadecuada para el consumo humano",
      cantidadAguaEmpresas: "Uso irresponsable del agua por parte de las empresas"
    }
  ];

  // Obtener los atributos según el nivel de contaminación
  const obtenerAtributos = () => {
    for (let i = atributos.length - 1; i >= 0; i--) {
      if (contaminacion >= atributos[i].nivel) {
        return atributos[i];
      }
    }
    return atributos[0];
  };

  const atributosActuales = obtenerAtributos();

  return (
    <div>
      <Nav />
      <Container fluid style={{ backgroundColor: '#2e8555', padding: '100px' }}>
        <motion.h1
          style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: '45px' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          El futuro del agua
        </motion.h1>
        <motion.p
          style={{ color: 'white', textAlign: 'center', fontSize: '35px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Depende de una gestión eficiente, conservación responsable y conciencia ciudadana.
        </motion.p>
      </Container>

      <PasadoAgua />

      <Container className="mt-4 text-center">
        {/* Información sobre cómo es el agua en Chiapas hoy */}
        <Row>
          <Col md={6}>
            <motion.img
              src={aguaHoyImg}
              alt="Agua hoy"
              style={{ width: '100%' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Col>
          <Col md={6}>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Como es el agua en Chiapas hoy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Atributos:
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.li>Niveles moderados de acidez en el agua</motion.li>
              <motion.li>Ríos afectados por la contaminación</motion.li>
              <motion.li>Plantas de tratamiento en funcionamiento, pero insuficientes</motion.li>
              <motion.li>Calidad del agua comprometida por la contaminación</motion.li>
              <motion.li>Alta cantidad de agua consumida por empresas</motion.li>
            </motion.ul>
          </Col>
        </Row>
      </Container>

      <Container className="mt-4 text-center">
        <Row>
          <Col md={6}>
            <motion.img
              src={aguaFuturoImg}
              alt="Agua futuro"
              style={{ width: '100%' }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Col>
          <Col md={6}>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Como será el agua en Chiapas en el futuro
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Nivel de Contaminación: {contaminacion}%
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <ProgressBar now={contaminacion} label={`${contaminacion}%`} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {atributosActuales.descripcion}
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <motion.li>{atributosActuales.riosLimpios}</motion.li>
              <motion.li>{atributosActuales.plantasTratamiento}</motion.li>
              <motion.li>{atributosActuales.calidadAgua}</motion.li>
              <motion.li>{atributosActuales.cantidadAguaEmpresas}</motion.li>
            </motion.ul>
          </Col>
        </Row>
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Button variant="primary" className="m-2" onClick={aumentarContaminacion}>Aumentar Contaminación</Button>
          <Button variant="primary" className="m-2" onClick={disminuirContaminacion}>Disminuir Contaminación</Button>
        </motion.div>
      </Container>

      <Footer />
    </div>
  );
};

export default Agua;
