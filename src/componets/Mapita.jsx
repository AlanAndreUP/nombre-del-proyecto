import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './css/Tabla.css';

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://alansanchez12-001-site1.htempurl.com/api/Productoes')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="table-container">
 
    <div className="table-content">
    <h1 className="text-white">Productos</h1>
      <input type="text" placeholder="Buscar producto" /> 
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tamaño</th>
            <th>Medidas</th>
            <th>Material</th>
            <th>Precio</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.nombre}</td>
              <td>{product.tamaño}</td>
              <td>{product.medidas}</td>
              <td>{product.material}</td>
              <td>{product.precio}</td>
              <td>{product.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
  
  );
};

export default ProductTable;
