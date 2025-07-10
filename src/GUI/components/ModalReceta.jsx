import React, { useState } from 'react';
import styles from './styles/ModalReceta.module.css';

export default function ModalReceta({ receta, onClose }) {
  const [pasoActual, setPasoActual] = useState(0);
  if (!receta) return null;

  const cerrarModal = () => {
    setPasoActual(0);
    onClose();
  };

  const ingredientesList = Array.isArray(receta.ingredientes)
    ? receta.ingredientes
    : receta.ingredientes
    ? receta.ingredientes.split(',').map(i => i.trim())
    : [];

  const pasos = receta.instrucciones
    ? receta.instrucciones.split('. ').map(p => p.trim()).filter(p => p.length > 0)
    : [];

  const siguientePaso = () => {
    if (pasoActual < pasos.length - 1) setPasoActual(pasoActual + 1);
  };

  const pasoAnterior = () => {
    if (pasoActual > 0) setPasoActual(pasoActual - 1);
  };

  return (
    <div className={styles.overlay} onClick={cerrarModal}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button onClick={cerrarModal} className={styles.close}>×</button>

        <h2 className={styles.title}>{receta.nombre}</h2>
        <img src={receta.imagen} alt={receta.nombre} className={styles.image} />

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Ingredientes</h3>
          {ingredientesList.length > 0 ? (
            <ul className={styles.list}>
              {ingredientesList.map((ing, i) => (
                <li key={i} className={styles.listItem}>{ing}</li>
              ))}
            </ul>
          ) : (
            <p className={styles.noData}>No hay ingredientes listados.</p>
          )}
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>
            Instrucciones ({pasos.length > 0 ? `Paso ${pasoActual + 1} de ${pasos.length}` : 'Sin pasos'})
          </h3>
          {pasos.length > 0 ? (
            <>
              <p className={styles.pasoTexto}>{pasos[pasoActual]}.</p>
              <div className={styles.controls}>
                <button
                  onClick={pasoAnterior}
                  disabled={pasoActual === 0}
                  className={styles.controlBtn}
                  style={{ opacity: pasoActual === 0 ? 0.5 : 1, cursor: pasoActual === 0 ? 'not-allowed' : 'pointer' }}
                >
                  ← Anterior
                </button>
                <button
                  onClick={siguientePaso}
                  disabled={pasoActual === pasos.length - 1}
                  className={styles.controlBtn}
                  style={{ opacity: pasoActual === pasos.length - 1 ? 0.5 : 1, cursor: pasoActual === pasos.length - 1 ? 'not-allowed' : 'pointer' }}
                >
                  Siguiente →
                </button>
              </div>
            </>
          ) : (
            <p className={styles.noData}>No hay instrucciones detalladas.</p>
          )}
        </div>
      </div>
    </div>
  );
}