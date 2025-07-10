import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './styles/AgregarReceta.module.css';

export default function AgregarReceta() {
  const [nombre, setNombre] = useState('');
  const [ingredientesTexto, setIngredientesTexto] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [instrucciones, setInstrucciones] = useState('');
  const [imagen, setImagen] = useState('');
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = `${process.env.REACT_APP_API_URL}/utils/recetas`;

  const isValidURL = (str) => {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientesArray = ingredientesTexto
      .split(',')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    if (nombre.trim().length < 3) {
      showToast('El nombre debe tener al menos 3 caracteres.', 'error');
      return;
    }
    if (ingredientesArray.length === 0) {
      showToast('Debe ingresar al menos un ingrediente.', 'error');
      return;
    }
    if (!/^\d+\s*(h|min)$/i.test(tiempo.trim())) {
      showToast('El tiempo debe ser como "30 min" o "1 h".', 'error');
      return;
    }
    if (imagen.trim() && !isValidURL(imagen.trim())) {
      showToast('La URL de imagen no es válida.', 'error');
      return;
    }

    const nuevaReceta = {
      nombre: nombre.trim(),
      instrucciones: instrucciones.trim(),
      tiempo: tiempo.trim(),
      imagen: imagen.trim(),
      ingredientes: ingredientesArray,
    };

    try {
      setLoading(true);
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaReceta),
      });

      if (!res.ok) throw new Error('Error al guardar la receta');

      const data = await res.json();
      showToast(`Receta agregada (ID: ${data.recetaId}) 🎉`, 'success');

      setNombre('');
      setIngredientesTexto('');
      setTiempo('');
      setInstrucciones('');
      setImagen('');
    } catch (err) {
      console.error(err);
      showToast('Hubo un error al guardar la receta. 😞', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={styles.heading}>Agregar Nueva Receta</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className={styles.input}
          />

          <label className={styles.label}>Ingredientes (separados por coma)</label>
          <input
            type="text"
            value={ingredientesTexto}
            onChange={(e) => setIngredientesTexto(e.target.value)}
            required
            className={styles.input}
          />

          <label className={styles.label}>Tiempo (ej. 30 min, 1 h)</label>
          <input
            type="text"
            value={tiempo}
            onChange={(e) => setTiempo(e.target.value)}
            required
            className={styles.input}
          />

          <label className={styles.label}>Instrucciones</label>
          <textarea
            value={instrucciones}
            onChange={(e) => setInstrucciones(e.target.value)}
            required
            rows={4}
            className={styles.input}
            style={{ resize: 'vertical' }}
          />

          <label className={styles.label}>URL de Imagen (opcional)</label>
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className={styles.input}
          />

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Receta'}
          </button>
        </form>
      </div>

      {toast && (
        <div
          className={styles.toast}
          style={{
            backgroundColor: toast.type === 'success' ? '#4caf50' : '#f44336',
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}