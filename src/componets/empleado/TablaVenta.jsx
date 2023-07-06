import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/Login.css';
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    fetch('http://alansanchez12-001-site1.htempurl.com/api/Ventas1')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.log(error));
  }, []);

  const getProductDetails = (productId) => {
    fetch(`http://alansanchez12-001-site1.htempurl.com/api/Productoes/${productId}`)
      .then(response => response.json())
      .then(data => {
        setProductDetails(prevState => ({
          ...prevState,
          [productId]: data
        }));
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="table-container">
      <div className="table-content">
        <h1 className="text-white">Ventas</h1>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha Venta</th>
              <th>Pago Total</th>
              <th>Articulos</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.fechaVenta}</td>
                <td>{product.pagoTotal}</td>
                <td>
                  {product.articulosVendidos ? (
                    JSON.parse(product.articulosVendidos).map((item) => {
                      getProductDetails(item.id);
                      const itemDetails = productDetails[item.id];
                      if (itemDetails) {
                        return `${itemDetails.nombre} (${item.cantidad})`;
                      } else {
                        return 'N/A';
                      }
                    }).join(', ')
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};


export default ProductTable;
