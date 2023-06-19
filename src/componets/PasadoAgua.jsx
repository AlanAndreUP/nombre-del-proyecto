import { Container, Button, Row, Col } from 'react-bootstrap';
import Nav from "./Nav";
import Footer from "./Footer";
import aguaAntesImg from "../img/13.jpg";
import aguaHoyImg from "../img/12.jpg";
import aguaFuturoImg from "../img/13.jpg";
import React, { useState } from "react";
import { ProgressBar } from 'react-bootstrap';

const Agua = () => {
  const [anio, setAnio] = useState(1960); // Año
  const [contaminacion, setContaminacion] = useState(0); // Nivel de contaminación

  // Función para aumentar el año
  const aumentarAnio = () => {
    if (anio < 2010) {
      setAnio(anio + 10);
    }
  };

  // Función para disminuir el año
  const disminuirAnio = () => {
    if (anio > 1960) {
      setAnio(anio - 10);
    }
  };

  // Atributos según el año
  const atributos = [
    {
      anio: 1960,
      descripcion: "Altos niveles de acidez en el agua en 1960",
      riosLimpios: "Ríos limpios y recuperados en 1960",
      plantasTratamiento: "Plantas de tratamiento eficientes y en mayor cantidad en 1960",
      calidadAgua: "Calidad del agua óptima para el consumo humano en 1960",
      cantidadAguaEmpresas: "Uso responsable del agua por parte de las empresas en 1960"
    },
    {
      anio: 1970,
      descripcion: "Moderados niveles de acidez en el agua en 1970",
      riosLimpios: "Ríos afectados por la contaminación en 1970",
      plantasTratamiento: "Plantas de tratamiento en funcionamiento, pero insuficientes en 1970",
      calidadAgua: "Calidad del agua comprometida por la contaminación en 1970",
      cantidadAguaEmpresas: "Alta cantidad de agua consumida por empresas en 1970"
    },
    {
      anio: 1980,
      descripcion: "Altos niveles de acidez en el agua en 1980",
      riosLimpios: "Ríos contaminados y sin vida en 1980",
      plantasTratamiento: "Plantas de tratamiento insuficientes o fuera de servicio en 1980",
      calidadAgua: "Calidad del agua inadecuada para el consumo humano en 1980",
      cantidadAguaEmpresas: "Uso irresponsable del agua por parte de las empresas en 1980"
    },
    {
      anio: 1990,
      descripcion: "Bajos niveles de acidez en el agua en 1990",
      riosLimpios: "Ríos limpios y recuperados en 1990",
      plantasTratamiento: "Plantas de tratamiento eficientes y en mayor cantidad en 1990",
      calidadAgua: "Calidad del agua óptima para el consumo humano en 1990",
      cantidadAguaEmpresas: "Uso responsable del agua por parte de las empresas en 1990"
    },
    {
      anio: 2000,
      descripcion: "Moderados niveles de acidez en el agua en 2000",
      riosLimpios: "Ríos afectados por la contaminación en 2000",
      plantasTratamiento: "Plantas de tratamiento en funcionamiento, pero insuficientes en 2000",
      calidadAgua: "Calidad del agua comprometida por la contaminación en 2000",
      cantidadAguaEmpresas: "Alta cantidad de agua consumida por empresas en 2000"
    },
    {
      anio: 2010,
      descripcion: "Bajos niveles de acidez en el agua en 2010",
      riosLimpios: "Ríos limpios y recuperados en 2010",
      plantasTratamiento: "Plantas de tratamiento eficientes y en mayor cantidad en 2010",
      calidadAgua: "Calidad del agua óptima para el consumo humano en 2010",
      cantidadAguaEmpresas: "Uso responsable del agua por parte de las empresas en 2010"
    }
  ];

  // Obtener los atributos según el año
  const obtenerAtributos = () => {
    for (let i = atributos.length - 1; i >= 0; i--) {
      if (anio >= atributos[i].anio) {
        return atributos[i];
      }
    }
    return atributos[0];
  };

  const atributosActuales = obtenerAtributos();

  return (
    <div>
      <Container className="mt-4 text-center">
        <Row>
          <Col md={6}>
            <img src={aguaFuturoImg} alt="Agua futuro" style={{ width: '100%' }} />
          </Col>
          <Col md={6}>
            <h2>Como era el pasado en Chiapas</h2>
            <p>Año: {anio}</p>
            
            <p>{atributosActuales.descripcion}</p>
            <ul>
              <li>{atributosActuales.riosLimpios}</li>
              <li>{atributosActuales.plantasTratamiento}</li>
              <li>{atributosActuales.calidadAgua}</li>
              <li>{atributosActuales.cantidadAguaEmpresas}</li>
            </ul>
          </Col>
        </Row>
        <div className="text-center">
          <Button variant="primary" className="m-2" onClick={aumentarAnio}>Aumentar Años</Button>
          <Button variant="primary" className="m-2" onClick={disminuirAnio}>Disminuir Años</Button>
        </div>
      </Container>
    </div>
  );
};

export default Agua;
