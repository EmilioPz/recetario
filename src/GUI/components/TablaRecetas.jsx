import React, { useState } from 'react';
import { Table, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { recetas } from '../../API/recetas';

export default function TablaRecetas() {
  const [busqueda, setBusqueda] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const recetasPorPagina = 10;

  // Filtrar recetas por nombre
  const recetasFiltradas = recetas.filter((r) =>
    r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Cálculos de paginación
  const totalPaginas = Math.ceil(recetasFiltradas.length / recetasPorPagina);
  const inicio = (paginaActual - 1) * recetasPorPagina;
  const recetasPagina = recetasFiltradas.slice(inicio, inicio + recetasPorPagina);

  // Generar ítems de paginación
  const items = [];
  for (let num = 1; num <= totalPaginas; num++) {
    items.push(
      <Pagination.Item
        key={num}
        active={num === paginaActual}
        onClick={() => setPaginaActual(num)}
      >
        {num}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <h3>Listado de Recetas</h3>

      <Form.Group className="mb-3" controlId="busquedaRecetas">
        <Form.Control
          type="text"
          placeholder="Buscar receta por nombre..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value);
            setPaginaActual(1); // Reiniciar a la primera página al buscar
          }}
        />
      </Form.Group>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>ID</th>
            <th>Nombre</th>
            <th>Ingredientes</th>
            <th>Tiempo</th>
          </tr>
        </thead>
        <tbody>
          {recetasPagina.map((r) => (
            <tr key={r.id}>
              <td>
                <img
                  src={r.imagen}
                  alt={r.nombre}
                  style={{
                    width: 60,
                    height: 40,
                    objectFit: 'cover',
                    borderRadius: 4,
                  }}
                />
              </td>
              <td>{r.id}</td>
              <td>
                <Link to={`/receta/${r.id}`}>{r.nombre}</Link>
              </td>
              <td>{r.ingredientes.join(', ')}</td>
              <td>{r.tiempo}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {totalPaginas > 1 && (
        <Pagination className="justify-content-center">{items}</Pagination>
      )}
    </div>
  );
}