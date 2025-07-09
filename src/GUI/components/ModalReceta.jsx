import React, { useState } from 'react';

export default function ModalReceta({ receta, onClose }) {
  const [pasoActual, setPasoActual] = useState(0);

  if (!receta) return null;

  const onCloseModal = () =>{
    setPasoActual(0);
    onClose();
  }

  // Dividir instrucciones en pasos separados por ". "
  const pasos = receta.instrucciones
    .split('. ')
    .map(p => p.trim())
    .filter(p => p.length > 0);

  const siguientePaso = () => {
    if (pasoActual < pasos.length - 1) setPasoActual(pasoActual + 1);
  };

  const pasoAnterior = () => {
    if (pasoActual > 0) setPasoActual(pasoActual - 1);
  };

  return (
    <div style={styles.overlay} onClick={onCloseModal}>
      <div style={{ ...styles.modal, animation: 'slideIn 0.3s ease' }} onClick={e => e.stopPropagation()}>
        <button onClick={onCloseModal} style={styles.close}>×</button>
        <h2 style={styles.title}>{receta.nombre}</h2>
        <img src={receta.imagen} alt={receta.nombre} style={styles.image} />

        <section>
          <h3 style={styles.sectionTitle}>Ingredientes</h3>
          <ul style={styles.list}>
            {receta.ingredientes.map((ing, idx) => (
              <li key={idx}>{ing}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 style={styles.sectionTitle}>Instrucciones (Paso {pasoActual + 1} de {pasos.length})</h3>
          <p style={styles.instrucciones}>{pasos[pasoActual]}.</p>

          <div style={styles.controls}>
            <button
              onClick={pasoAnterior}
              disabled={pasoActual === 0}
              style={{ ...styles.controlBtn, opacity: pasoActual === 0 ? 0.5 : 1 }}
            >
              ← Anterior
            </button>
            <button
              onClick={siguientePaso}
              disabled={pasoActual === pasos.length - 1}
              style={{ ...styles.controlBtn, opacity: pasoActual === pasos.length - 1 ? 0.5 : 1 }}
            >
              Siguiente →
            </button>
          </div>
        </section>
      </div>

      <style>{`
        @keyframes slideIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '30px 24px',
    borderRadius: 12,
    maxWidth: 600,
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
    fontFamily: "'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 16,
    fontSize: '1.8rem',
    background: 'none',
    border: 'none',
    color: '#aaa',
    cursor: 'pointer',
    transition: 'color 0.2s',
  },
  title: {
    marginTop: 0,
    marginBottom: 16,
    fontSize: '1.8rem',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: 8,
    objectFit: 'cover',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: 8,
    color: '#444',
  },
  list: {
    paddingLeft: 20,
    marginBottom: 20,
    color: '#555',
    lineHeight: '1.6',
  },
  instrucciones: {
    color: '#555',
    lineHeight: '1.6',
    whiteSpace: 'pre-line',
    minHeight: 80,
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  controlBtn: {
    padding: '8px 16px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
};