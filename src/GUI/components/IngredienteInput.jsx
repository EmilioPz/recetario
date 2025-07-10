import React from 'react';
import styles from './styles/IngredienteInput.module.css';

const IngredienteInput = ({ value, onChange, onAdd }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div className={styles.inputGroup}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Agregar ingrediente"
        onKeyDown={handleKeyDown}
        className={styles.input}
      />
      <button onClick={onAdd} className={styles.button}>
        Añadir
      </button>
    </div>
  );
};

export default IngredienteInput;