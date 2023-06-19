import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './css/Tabla.css'
const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://alansanchez12-001-site1.htempurl.com/api/Productoes')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="table-container  mt-4">
    
      <Table striped bordered hover variant="dark mt-4">
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
          {products.map(product => (
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
  );
};

export default ProductTable;
