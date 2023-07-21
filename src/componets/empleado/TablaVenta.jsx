import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/Login.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productDetails, setProductDetails] = useState({});

  const itemsPerPage = 5;

  const { userId } = useParams();

  useEffect(() => {
    fetch(`http://alansanchez12-001-site1.htempurl.com/api/Ventas1`, {
      method: 'GET'
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error('No se encontraron ventas para el empleado');
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(data => {
        setProducts(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch(error => console.log(error));
  }, [userId]);

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

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderProductRows = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = products.slice(startIndex, endIndex);

    return currentProducts.map((product) => (
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
    ));
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
            {renderProductRows()}
          </tbody>
        </Table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => goToPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
