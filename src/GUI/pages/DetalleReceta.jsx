import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useFetch } from '../../utils/hooks/useFetch';
import styles from './styles/DetalleReceta.module.css';

export default function DetalleReceta() {
  const { id } = useParams();
  const { data: receta, loading, error } = useFetch(`${process.env.REACT_APP_API_URL}/utils/recetas/${id}`);

  if (loading) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <h2 className={styles.heading}>Cargando receta...</h2>
        </div>
      </div>
    );
  }

  if (error || !receta) {
    return (
      <div className={styles.container}>
        <Sidebar />
        <div className={styles.content}>
          <h2 className={styles.heading}>Receta no encontrada</h2>
          <Link to="/" className={styles.link}>← Volver al inicio</Link>
        </div>
      </div>
    );
  }

  const ingredientesList = Array.isArray(receta.ingredientes)
    ? receta.ingredientes
    : receta.ingredientes
    ? receta.ingredientes.split(',').map((i) => i.trim())
    : [];

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h2 className={styles.heading}>{receta.nombre}</h2>

        <div className={styles.card}>
          <img src={receta.imagen} alt={receta.nombre} className={styles.image} />

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Ingredientes</h3>
            <ul className={styles.list}>
              {ingredientesList.map((ing, idx) => (
                <li key={idx} className={styles.listItem}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Tiempo de preparación</h3>
            <p className={styles.text}>{receta.tiempo}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Instrucciones</h3>
            <p className={styles.text}>{receta.instrucciones}</p>
          </div>

          <Link to="/" className={styles.backBtn}>← Volver</Link>
        </div>
      </div>
    </div>
  );
}
