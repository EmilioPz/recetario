import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Spinner } from 'react-bootstrap';
import styles from './styles/TablaRecetas.module.css';
import BotoneraReceta from './BotoneraReceta';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = 'http://localhost:3001/api';

export default function TablaRecetas({ onRefresh }) {
  const [recetas, setRecetas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newImage, setNewImage] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);

  const recetasPorPagina = 8;

  useEffect(() => {
    cargarRecetas();
  }, []);

  const cargarRecetas = () => {
    setLoading(true);
    fetch(`${API_URL}/recetas`)
      .then((res) => res.json())
      .then((data) => setRecetas(data))
      .catch(() => toast.error('❌ Error al cargar recetas'))
      .finally(() => setLoading(false));
  };

  const startEdit = (receta) => {
    setEditId(receta.id);
    setNewImage(receta.imagen);
  };

  const saveEdit = (id) => {
    fetch(`${API_URL}/recetas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imagen: newImage }),
    })
      .then((res) => res.json())
      .then(() => {
        setEditId(null);
        cargarRecetas();
        if (onRefresh) onRefresh();
        toast.success('✅ Imagen actualizada');
      })
      .catch(() => toast.error('❌ Error al actualizar imagen'));
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar esta receta?')) {
      fetch(`${API_URL}/recetas/${id}`, { method: 'DELETE' })
        .then((res) => {
          if (!res.ok) throw new Error('Error al eliminar receta');
          return res.json();
        })
        .then((data) => {
          cargarRecetas();
          if (onRefresh) onRefresh();
          toast.success(data.message || '🗑️ Receta eliminada correctamente');
        })
        .catch(() => toast.error('❌ Error al eliminar receta'));
    }
  };

  const recetasFiltradas = recetas.filter((r) =>
    r.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(recetasFiltradas.length / recetasPorPagina);
  const recetasPagina = recetasFiltradas.slice(
    (pagina - 1) * recetasPorPagina,
    pagina * recetasPorPagina
  );

  return (
    <div>
      {/* Toast container global */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" /> Cargando recetas...
        </div>
      ) : (
        <>
          <Form.Control
            type="text"
            placeholder="🔎 Buscar receta..."
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPagina(1);
            }}
            className="mb-3"
          />

          <Table striped bordered hover responsive className={styles.table}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Tiempo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recetasPagina.map((r) => (
                <tr key={r.id}>
                  <td>
                    {editId === r.id ? (
                      <Form.Control
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        size="sm"
                      />
                    ) : (
                      <img
                        src={r.imagen}
                        alt={r.nombre}
                        className={styles.image}
                      />
                    )}
                  </td>
                  <td>{r.nombre}</td>
                  <td>{r.tiempo}</td>
                  <td>
                    <BotoneraReceta
                      isEditing={editId === r.id}
                      recetaId={r.id}
                      receta={r}
                      onSave={saveEdit}
                      onCancel={() => setEditId(null)}
                      onEdit={startEdit}
                      onDelete={handleEliminar}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {totalPaginas > 1 && (
            <Pagination className="justify-content-center">
              {[...Array(totalPaginas).keys()].map((num) => (
                <Pagination.Item
                  key={num + 1}
                  active={num + 1 === pagina}
                  onClick={() => setPagina(num + 1)}
                >
                  {num + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}