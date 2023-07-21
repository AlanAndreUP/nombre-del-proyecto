import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Nav from './Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const MiComponente = () => {
  const [productos, setProductos] = useState([]);
  const [nota, setNota] = useState([]);
  const [total, setTotal] = useState(0);
  const [conFactura, setConFactura] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [descripcionPendiente, setDescripcionPendiente] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  useEffect(() => {
    // Llamada a la API para obtener los productos
    fetch('http://alansanchez12-001-site1.htempurl.com/api/Productoes')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener las sucursales
    fetch('http://alansanchez12-001-site1.htempurl.com/api/Sucursals')
      .then(response => response.json())
      .then(data => setSucursales(data))
      .catch(error => console.log(error));
  }, []);

  const agregarProducto = (producto) => {
    const productoExistente = nota.find(item => item.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en la nota, aumenta su cantidad
      const nuevaNota = nota.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setNota(nuevaNota);
    } else {
      // Si el producto no está en la nota, lo agrega con cantidad 1
      setNota([...nota, { id: producto.id, nombre: producto.nombre, cantidad: 1 }]);
    }

    // Actualizar el total
    setTotal(prevTotal => prevTotal + producto.precio);
  };

  const quitarProducto = (producto) => {
    const productoExistente = nota.find(item => item.id === producto.id);

    if (productoExistente) {
      if (productoExistente.cantidad === 1) {
        // Si la cantidad es 1, se elimina el producto de la nota
        const nuevaNota = nota.filter(item => item.id !== producto.id);
        setNota(nuevaNota);
      } else {
        // Si la cantidad es mayor a 1, se reduce en 1 la cantidad del producto
        const nuevaNota = nota.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad - 1 } : item
        );
        setNota(nuevaNota);
      }

      // Actualizar el total
      setTotal(prevTotal => prevTotal - producto.precio);
    }
  };

  const handleConFacturaChange = () => {
    setConFactura(prevValue => !prevValue);
  };

  const handlePedidoDisenoClick = () => {
    setShowModal(true);
  };

  const handleRealizarVentaClick = () => {
    if (nota.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La nota está vacía. No se puede realizar la venta.',
      });
      return;
    }

    const fechaVenta = new Date();

    const ventaData = {
      id: 0,
      fechaVenta: fechaVenta,
      pagoTotal: total,
      sucursal: 1,
      idEmpleado: 1,
      siFactura: conFactura ? 1 : 0,
      imgNota: "",
      articulosVendidos: JSON.stringify(nota.map(item => ({
        id: item.id,
        cantidad: item.cantidad
      })))
    };

    fetch('http://alansanchez12-001-site1.htempurl.com/api/Ventas1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ventaData)
    })
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Venta realizada exitosamente',
          text: JSON.stringify(data)
        });
        // Aquí puedes agregar cualquier lógica adicional que necesites después de realizar la venta correctamente
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al realizar la venta',
          text: error.message
        });
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    const pendienteData = {
      ID: 0,
      IDSucursal: selectedSucursal,
      Descripcion: descripcionPendiente,
      Realizado: 0,
      fechaIngreso: new Date(),
      fechaEntrega: fechaEntrega
    };

    fetch('http://alansanchez12-001-site1.htempurl.com/api/Pendientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pendienteData)
    })
      .then(response => response.json())
      .then(data => {
        setShowModal(false);
        Swal.fire({
          icon: 'success',
          title: 'Pedido a diseño enviado',
          text: JSON.stringify(data)
        });
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar el pedido a diseño',
          text: error.message
        });
      });
  };

  return (
    <div className="container-fluid contsfondo">
      <div className="row">
        <div className="col-md-1 col-sm-2 pl-0">
          <Nav />
        </div>
        <div className="col-md-5">
          <h2 className="text-white">Productos</h2>
          <table className="table text-white">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <tr key={producto.id}>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => agregarProducto(producto)}>
                      Añadir a lista
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">
          <div className="border border-warning m-3 p-3">
            <h2 className="text-white">Nota</h2>
            <ul className="list-group">
              {nota.map(producto => (
                <li key={producto.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {producto.nombre} - Cantidad: {producto.cantidad}
                  <button className="btn btn-primary btn-sm ml-2" onClick={() => agregarProducto(producto)}>
                    +
                  </button>
                  <button className="btn btn-danger btn-sm ml-2" onClick={() => quitarProducto(producto)}>
                    -
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-white">Total: ${total.toString()}</p>
            <label className="text-white">
              <input
                type="checkbox"
                checked={conFactura}
                onChange={handleConFacturaChange}
              />
              Compra con factura
            </label>
            <br />
            <button className="btn btn-primary m-1" onClick={handlePedidoDisenoClick}>
              Pedido a diseño
            </button>
            <button className="btn btn-primary m-1" onClick={handleRealizarVentaClick}>
              Realizar Venta
            </button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pedido a Diseño</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="descripcionPendiente">Descripción del pedido:</label>
            <textarea
              id="descripcionPendiente"
              className="form-control"
              value={descripcionPendiente}
              onChange={(e) => setDescripcionPendiente(e.target.value)}
              rows={4}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sucursalSelect">Selecciona la sucursal:</label>
            <select
              id="sucursalSelect"
              className="form-control"
              value={selectedSucursal}
              onChange={(e) => setSelectedSucursal(e.target.value)}
            >
              <option value="">Selecciona una sucursal</option>
              {sucursales.map(sucursal => (
                <option key={sucursal.id} value={sucursal.id}>{sucursal.nombreSucursal}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fechaEntrega">Fecha de Entrega:</label>
            <input
              id="fechaEntrega"
              type="date"
              className="form-control"
              value={fechaEntrega}
              onChange={(e) => setFechaEntrega(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleModalSubmit}>
            Enviar pedido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MiComponente;
