import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Input,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import "../css/MenuTablas.css";

const Productoes = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    tamaño: "",
    medidas: "",
    material: "",
    precio: "",
    descripcion: "",
  });
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalBuscar, setModalBuscar] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://alansanchez12-001-site1.htempurl.com/api/Productoes"
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const jsonData = await response.json();
      setData(jsonData);
      console.log("Datos obtenidos correctamente:", jsonData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const mostrarModalEditar = (registro) => {
    setForm(registro);
    setModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setModalEditar(false);
  };

  const abrirModalBuscar = () => {
    const id = parseInt(document.getElementById("buscar").value);
    if (id < 1) {
      alert("No encontrado");
    } else {
      const item = data.find((item) => item.id === id);
      console.log(item.id);
      setForm(item);
      setModalBuscar(true);
    }
  };

  const cerrarModalBuscar = () => {
    setModalBuscar(false);
  };

  const insertar = async () => {
    try {
      const response = await fetch(
        "http://alansanchez12-001-site1.htempurl.com/api/Productoes",
        form,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      if (!response.ok) {
        throw new Error("Error al insertar el producto");
      }

      setModalInsertar(false);
      fetchData();
    } catch (error) {
      console.error("Error al insertar el producto:", error);
    }
  };

  const editar = async () => {
    try {
      const response = await fetch(
        `http://alansanchez12-001-site1.htempurl.com/api/Productoes/${form.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Error al editar el producto");
      }

      setModalEditar(false);
      fetchData();
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  const eliminar = async (id) => {
    try {
      const response = await fetch(
        `http://alansanchez12-001-site1.htempurl.com/api/Productoes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      fetchData();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  return (
    <>
      <div className="menu-tablas-container">
        <Container>
          <br />
          <br />
          <center>
            <h1 style={{ color: "white" }}>REGISTRO DE PRODUCTOS</h1>
          </center>

          <br />
          <span style={{ display: "flex" }}>
            <Button color="warning" onClick={() => this.abrirModalBuscar()}>
              Buscar
            </Button>
            <Input
              type="text"
              id="buscar"
              className="form-control bg-dark text-light"
            />
          </span>

          <br />
          <br />
          <Button color="warning" onClick={() => mostrarModalInsertar()}>
            Insertar nuevo producto
          </Button>
          <br />
          <br />
          <Table className="table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tamaño</th>
                <th>Medidas</th>
                <th>Material</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.nombre}</td>
                  <td>{item.tamaño}</td>
                  <td>{item.medidas}</td>
                  <td>{item.material}</td>
                  <td>{item.precio}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <Button
                      color="warning"
                      onClick={() => mostrarModalEditar(item)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={() => eliminar(item.id)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar producto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={data.length + 2}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Tamaño:</label>
              <input
                className="form-control"
                name="tamaño"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Medidas:</label>
              <input
                className="form-control"
                name="medidas"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Material:</label>
              <input
                className="form-control"
                name="material"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Precio:</label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => insertar()}>
              Insertar
            </Button>{" "}
            <Button
              className="btn btn-danger"
              onClick={() => cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar producto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>ID:</label>
              <input
                className="form-control"
                readOnly
                type="text"
                value={form.id}
              />
            </FormGroup>
            <FormGroup>
              <label>Nombre:</label>
              <input
                className="form-control"
                name="nombre"
                type="text"
                onChange={handleChange}
                value={form.nombre}
              />
            </FormGroup>
            <FormGroup>
              <label>Tamaño:</label>
              <input
                className="form-control"
                name="tamaño"
                type="text"
                onChange={handleChange}
                value={form.tamaño}
              />
            </FormGroup>
            <FormGroup>
              <label>Medidas:</label>
              <input
                className="form-control"
                name="medidas"
                type="text"
                onChange={handleChange}
                value={form.medidas}
              />
            </FormGroup>
            <FormGroup>
              <label>Material:</label>
              <input
                className="form-control"
                name="material"
                type="text"
                onChange={handleChange}
                value={form.material}
              />
            </FormGroup>
            <FormGroup>
              <label>Precio:</label>
              <input
                className="form-control"
                name="precio"
                type="text"
                onChange={handleChange}
                value={form.precio}
              />
            </FormGroup>
            <FormGroup>
              <label>Descripción:</label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={handleChange}
                value={form.descripcion}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => editar()}>
              Actualizar
            </Button>{" "}
            <Button
              className="btn btn-danger"
              onClick={() => cerrarModalEditar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalBuscar}>
          <ModalHeader>
            <div>
              <h3>Buscar producto</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Ingrese el ID del producto:</label>
              <Input
                id="buscar"
                className="form-control"
                type="number"
                placeholder="ID"
                min={1}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => abrirModalBuscar()}>
              Buscar
            </Button>{" "}
            <Button
              className="btn btn-danger"
              onClick={() => cerrarModalBuscar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default Productoes;
