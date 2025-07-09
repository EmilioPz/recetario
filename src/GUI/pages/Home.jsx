import React from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { recetas } from '../../API/recetas';


import { FaUtensils, FaCarrot, FaClock, FaStar, FaLeaf } from 'react-icons/fa';
import TablaRecetas from '../components/TablaRecetas';

// Simula ingredientes almacenados
const ingredientesAlmacenados = ['Cerdo', 'Piña', 'Cebolla', 'Lechuga', 'Pollo', 'Queso'];

// Simula recetas favoritas (por ahora las primeras 2)
const recetasPopulares = recetas.slice(0, 2);

// Calcula tiempo promedio en minutos (asumiendo formato "XX min")
const tiempoPromedio = () => {
  if (recetas.length === 0) return 0;
  const total = recetas.reduce((acc, r) => {
    const num = parseInt(r.tiempo);
    return acc + (isNaN(num) ? 0 : num);
  }, 0);
  return Math.round(total / recetas.length);
};

export default function Home() {
  return (
    <Container fluid style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Row>
        <Col md={3} className="p-0">
          <Sidebar />
        </Col>
        <Col md={9} className="p-4">
          <h2 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>Dashboard</h2>

          <Row xs={1} md={3} className="g-4 mb-4">
            <Col>
              <Card bg="light" className="shadow-sm rounded text-center p-3">
                <FaUtensils size={40} color="#0d6efd" />
                <Card.Title className="mt-2" style={{ fontWeight: '600' }}>
                  Recetas Disponibles
                </Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  {recetas.length}
                </Card.Text>
              </Card>
            </Col>

            <Col>
              <Card bg="light" className="shadow-sm rounded text-center p-3">
                <FaCarrot size={40} color="#198754" />
                <Card.Title className="mt-2" style={{ fontWeight: '600' }}>
                  Ingredientes Almacenados
                </Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  {ingredientesAlmacenados.length}
                </Card.Text>
              </Card>
            </Col>

            <Col>
              <Card bg="light" className="shadow-sm rounded text-center p-3">
                <FaClock size={40} color="#ffc107" />
                <Card.Title className="mt-2" style={{ fontWeight: '600' }}>
                  Tiempo Promedio (min)
                </Card.Title>
                <Card.Text style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                  {tiempoPromedio()}
                </Card.Text>
              </Card>
            </Col>
          </Row>

          <Row xs={1} md={2} className="g-4 mb-4">
            <Col>
              <Card bg="light" className="shadow-sm rounded p-3">
                <Card.Title style={{ fontWeight: '600' }}>
                  <FaStar style={{ color: '#0d6efd', marginRight: '8px' }} />
                  Recetas Populares
                </Card.Title>
                <Table hover responsive className="mt-3 mb-0">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>Nombre</th>
                      <th>Ingredientes</th>
                      <th>Tiempo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recetasPopulares.map(r => (
                      <tr key={r.id}>
                        <td>
                          <img
                            src={r.imagen}
                            alt={r.nombre}
                            style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 4 }}
                          />
                        </td>
                        <td>
                          <Link to={`/receta/${r.id}`}>{r.nombre}</Link>
                        </td>
                        <td>{r.ingredientes.join(', ')}</td>
                        <td>{r.tiempo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card>
            </Col>

            <Col>
              <Card bg="light" className="shadow-sm rounded p-3">
                <Card.Title style={{ fontWeight: '600' }}>
                  <FaLeaf style={{ color: '#198754', marginRight: '8px' }} />
                  Ingredientes Destacados
                </Card.Title>
                <ul style={{ marginTop: '1rem' }}>
                  {ingredientesAlmacenados.map((ing, i) => (
                    <li key={i} style={{ fontSize: '1rem' }}>
                      {ing}
                    </li>
                  ))}
                </ul>
              </Card>
            </Col>
          </Row>
          <TablaRecetas/>          
        </Col>
      </Row>
    </Container>
  );
}