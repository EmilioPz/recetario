import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

export default function AgregarReceta() {
    const [nombre, setNombre] = useState('');
    const [ingredientesTexto, setIngredientesTexto] = useState('');
    const [tiempo, setTiempo] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [imagen, setImagen] = React.useState('');


    const handleSubmit = e => {
        e.preventDefault();

        alert(`Receta agregada:
Nombre: ${nombre}
Ingredientes: ${ingredientesTexto}
Tiempo: ${tiempo}
Instrucciones: ${instrucciones}`);

        // Aquí podrías agregar la lógica para guardar la receta, por ejemplo en un estado global o localStorage

        // Limpia los campos
        setNombre('');
        setIngredientesTexto('');
        setTiempo('');
        setInstrucciones('');
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <Sidebar />
                </Col>
                <Col md={9} className="p-4">
                    <h2>Agregar Nueva Receta</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIngredientes">
                            <Form.Label>Ingredientes (separados por coma)</Form.Label>
                            <Form.Control
                                type="text"
                                value={ingredientesTexto}
                                onChange={e => setIngredientesTexto(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formTiempo">
                            <Form.Label>Tiempo de Preparación</Form.Label>
                            <Form.Control
                                type="text"
                                value={tiempo}
                                onChange={e => setTiempo(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formInstrucciones">
                            <Form.Label>Instrucciones</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={instrucciones}
                                onChange={e => setInstrucciones(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImagen">
                            <Form.Label>URL de la Imagen</Form.Label>
                            <Form.Control
                                type="url"
                                value={imagen}
                                onChange={e => setImagen(e.target.value)}
                                placeholder="https://..."
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Agregar Receta
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}