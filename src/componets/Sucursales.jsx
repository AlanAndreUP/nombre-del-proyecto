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

const Sucursales = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    NombreSucursal: "",
    DireccionSucursal: "",
    IDBodega: "",
   
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
        "http://alansanchez12-001-site1.htempurl.com/api/Sucursals"
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
        "http://alansanchez12-001-site1.htempurl.com/api/Sucursals",
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
        `http://alansanchez12-001-site1.htempurl.com/api/Sucursals/${form.id}`,
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
        `http://alansanchez12-001-site1.htempurl.com/api/Sucursals/${id}`,
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
                <th>NombreSucursal</th>
                <th>DireccionSucursal</th>
                <th>IDBodega</th>
                
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.NombreSucursal}</td>
                  <td>{item.DireccionSucursal}</td>
                  <td>{item.IDBodega}</td>
                 
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
                value={data.length + 1}
              />
            </FormGroup>
            <FormGroup>
              <label>NombreSucursal:</label>
              <input
                className="form-control"
                name="NombreSucursal"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>DireccionSucursal:</label>
              <input
                className="form-control"
                name="DireccionSucursal"
                type="text"
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <label>IDBodega:</label>
              <input
                className="form-control"
                name="IDBodega"
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
              <label>NombreSucursal:</label>
              <input
                className="form-control"
                name="NombreSucursal"
                type="text"
                onChange={handleChange}
                value={form.NombreSucursal}
              />
            </FormGroup>
            <FormGroup>
              <label>DireccionSucursal:</label>
              <input
                className="form-control"
                name="DireccionSucursal"
                type="text"
                onChange={handleChange}
                value={form.DireccionSucursal}
              />
            </FormGroup>
            <FormGroup>
              <label>IDBodega:</label>
              <input
                className="form-control"
                name="IDBodega"
                type="text"
                onChange={handleChange}
                value={form.IDBodega}
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

export default Sucursales;
