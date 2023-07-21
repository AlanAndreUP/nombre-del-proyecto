import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import '../css/Tabla.css';
import { useParams } from 'react-router-dom';
const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userId } = useParams();
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://alansanchez12-001-site1.htempurl.com/api/Productoes')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage));
      })
      .catch(error => console.log(error));
  }, []);

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
        <td>{product.nombre}</td>
        <td>{product.precio}</td>
        <td>{product.descripcion}</td>
      </tr>
    ));
  };

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
              <th>Precio</th>
              <th>Descripción</th>
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
