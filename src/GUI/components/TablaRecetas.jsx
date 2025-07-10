import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Spinner } from 'react-bootstrap';
import styles from './styles/TablaRecetas.module.css';
import BotoneraReceta from './BotoneraReceta';
import { toast } from 'react-toastify';

const API_URL = `${process.env.REACT_APP_API_URL}/utils`;

export default function TablaRecetas({ onRefresh }) {
  const [recetas, setRecetas] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newImage, setNewImage] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false); // NEW

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
    if (!newImage.trim()) {
      toast.warn('⚠️ La imagen no puede estar vacía');
      return;
    }

    setActionLoading(true);
    fetch(`${API_URL}/recetas/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imagen: newImage }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        toast.dismiss();
        toast.success('✅ Imagen actualizada');
        setEditId(null);
        cargarRecetas();
        if (onRefresh) onRefresh();
      })
      .catch(() => toast.dismiss() || toast.error('❌ Error al actualizar imagen'))
      .finally(() => setActionLoading(false));
  };

  const handleEliminar = (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta receta?')) return;

    setActionLoading(true);
    fetch(`${API_URL}/recetas/${id}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        toast.dismiss();
        toast.success(data.message || '🗑️ Receta eliminada correctamente');
        cargarRecetas();
        if (onRefresh) onRefresh();
      })
      .catch(() => toast.dismiss() || toast.error('❌ Error al eliminar receta'))
      .finally(() => setActionLoading(false));
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
                      disabled={actionLoading} // Pass loading state to disable buttons if needed
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