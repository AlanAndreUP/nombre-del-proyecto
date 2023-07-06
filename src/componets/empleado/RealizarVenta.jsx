import React, { useState, useEffect } from 'react';
import Nav from './Navbar';
const MiComponente = () => {
  const [productos, setProductos] = useState([]);
  const [nota, setNota] = useState([]);
  const [total, setTotal] = useState(0);
  const [conFactura, setConFactura] = useState(false);

  useEffect(() => {
    // Llamada a la API para obtener los productos
    fetch('http://alansanchez12-001-site1.htempurl.com/api/Productoes')
      .then(response => response.json())
      .then(data => setProductos(data))
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
    // Lógica para realizar el pedido a diseño
    // ...
  };

  const handleRealizarVentaClick = () => {
    // Lógica para realizar la venta
    // ...
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
    </div>
  );
};

export default MiComponente;
