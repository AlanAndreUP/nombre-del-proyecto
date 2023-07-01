import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import axios from 'axios';

class PDFGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.pdfRef = React.createRef();
    this.state = {
      orientation: 'portrait',
      products: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await axios.get('http://alansanchez12-001-site1.htempurl.com/api/Productoes');
      this.setState({ products: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  generatePDF = () => {
    const { orientation, products } = this.state;
    const pdf = new jsPDF(orientation, 'pt', 'letter');
    const pdfRef = this.pdfRef.current;

    html2canvas(pdfRef).then((canvas) => {

      // Agrega el texto centrado
      const text = 'Reporte Productos';
      const textWidth = pdf.getStringUnitWidth(text) * 12; // Ajusta el tamaño de la fuente según tus necesidades
      const textX = (pdf.internal.pageSize.getWidth() - textWidth) / 2;
      pdf.text(textX, 180, text); // Ajusta la posición vertical del texto según tus necesidades

      // Genera la tabla con los datos obtenidos de la API
      const tableData = products.map((product, index) => [index + 1, product.nombre, product.precio]);
      pdf.autoTable({
        startY: 220, // Ajusta la posición vertical de la tabla según tus necesidades
        head: [['ID', 'Nombre', 'Precio']],
        body: tableData,
      });

      pdf.save('ejemplo.pdf');
    });
  };

  handleOrientationChange = (event) => {
    this.setState({ orientation: event.target.value });
  };

  render() {
    const { orientation } = this.state;

    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <select value={orientation} onChange={this.handleOrientationChange} className='form-control'>
            <option value="portrait">Vertical</option>
            <option value="landscape">Horizontal</option>
          </select>
          <button onClick={this.generatePDF} className='m-1 btn btn-light'>Generar PDF</button>
        </div>
       
        <div ref={this.pdfRef}>
          {/* Aquí puedes colocar tu contenido que deseas exportar al PDF */}
          {/* Incluye la tabla, la imagen y el texto */}
        </div>
      </div>
    );
  }
}

export default PDFGenerator;
