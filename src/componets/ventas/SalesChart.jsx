import React from 'react';
import { Container, Row, Col, Button, Nav } from 'react-bootstrap';

import { VictoryBar, VictoryChart, VictoryAxis } from 'victory';

const AdminPage = () => {
  const data = [
    { month: 'Enero', ventas: 12 },
    { month: 'Febrero', ventas: 19 },
    { month: 'Marzo', ventas: 3 },
    { month: 'Abril', ventas: 5 },
    { month: 'Mayo', ventas: 2 },
    { month: 'Junio', ventas: 3 },
  ];

  return (
    <Container fluid>
      <Row>
        <Col sm={10}>
          <div style={{ color: 'white' }}>
         
            <h2>Graficas de ventas</h2>
            <VictoryChart style={{ color: 'white' }}>
              <VictoryAxis
                tickValues={data.map((item) => item.month)}
                style={{ tickLabels: { fill: 'white' } }}
              />
              <VictoryAxis dependentAxis style={{ tickLabels: { fill: 'white' } }} />
              <VictoryBar
                data={data}
                x="month"
                y="ventas"
                style={{ data: { fill: 'white' } }}
              />
            </VictoryChart>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
