import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import { recetas } from '../../API/recetas';

export default function DetalleReceta() {
  const { id } = useParams();
  const receta = recetas.find(r => r.id === parseInt(id));

  if (!receta) {
    return (
      <Container>
        <h2>Receta no encontrada</h2>
        <Link to="/">Volver al inicio</Link>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <Sidebar />
        </Col>
        <Col md={9} className="p-4">
          <h2>{receta.nombre}</h2>
          <Card>
            <Card.Body>
              <Card.Img variant="top" src={receta.imagen} alt={receta.nombre} />
              <Card.Title>Ingredientes</Card.Title>
              <Card.Text>{receta.ingredientes.join(', ')}</Card.Text>
              <Card.Title>Tiempo de preparación</Card.Title>
              <Card.Text>{receta.tiempo}</Card.Text>
              <Card.Title>Instrucciones</Card.Title>
              <Card.Text>{receta.instrucciones}</Card.Text>
              <Button variant="secondary" as={Link} to="/">
                Volver
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}