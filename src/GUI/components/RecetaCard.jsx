import React from 'react';
import styles from './styles/RecetaCard.module.css';

const RecetaCard = ({ receta, onView, colorPorcentaje }) => {
  return (
    <div className={styles.card}>
      <img src={receta.imagen} alt={receta.nombre} className={styles.cardImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{receta.nombre}</h3>

        <div className={styles.progressBarBackground}>
          <div
            className={styles.progressBarFill}
            style={{
              width: `${receta.porcentaje}%`,
              backgroundColor: colorPorcentaje(receta.porcentaje),
            }}
          />
        </div>
        <p
          className={styles.compatibility}
          style={{ color: colorPorcentaje(receta.porcentaje) }}
        >
          Compatibilidad: {receta.porcentaje}%
        </p>

        <p className={styles.ingredientes}>
          ✅ <strong>Tienes:</strong> {receta.encontrados?.join(', ') || 'ninguno'}
        </p>
        <p className={styles.ingredientes}>
          ❌ <strong>Faltan:</strong> {receta.faltantes?.join(', ') || 'ninguno'}
        </p>

        <div className={styles.tiempo}>
          ⏱️ {receta.tiempo}
        </div>

        <button className={styles.verBtn} onClick={() => onView(receta)}>
          Ver receta
        </button>
      </div>
    </div>
  );
};

export default RecetaCard;